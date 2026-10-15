import markdownIt from "markdown-it";
import markdownItFootnote from "markdown-it-footnote";
import markdownItAnchor from "markdown-it-anchor";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function (eleventyConfig) {
  // ---------- Markdown: footnotes + heading anchors ----------
  const md = markdownIt({ html: true, typographer: false, linkify: false })
    .use(markdownItFootnote)
    .use(markdownItAnchor, { level: [2, 3], tabIndex: false });

  // Cleaner footnote markup: plain numbers, no brackets, accessible labels.
  md.renderer.rules.footnote_caption = (tokens, idx) => {
    const n = Number(tokens[idx].meta.id + 1).toString();
    return tokens[idx].meta.subId > 0 ? `${n}:${tokens[idx].meta.subId}` : n;
  };
  md.renderer.rules.footnote_ref = (tokens, idx, options, env, slf) => {
    const id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
    const caption = slf.rules.footnote_caption(tokens, idx, options, env, slf);
    let refid = id;
    if (tokens[idx].meta.subId > 0) refid += `:${tokens[idx].meta.subId}`;
    return `<sup class="fn-ref"><a href="#fn${id}" id="fnref${refid}" aria-label="Footnote ${caption}">${caption}</a></sup>`;
  };
  md.renderer.rules.footnote_block_open = () =>
    '<section class="footnotes" aria-labelledby="notes-heading">\n<h2 id="notes-heading" class="footnotes-title">Notes</h2>\n<ol class="footnotes-list">\n';
  md.renderer.rules.footnote_anchor = (tokens, idx, options, env, slf) => {
    let id = slf.rules.footnote_anchor_name(tokens, idx, options, env, slf);
    if (tokens[idx].meta.subId > 0) id += `:${tokens[idx].meta.subId}`;
    return ` <a href="#fnref${id}" class="fn-back" aria-label="Back to text">↩</a>`;
  };

  eleventyConfig.setLibrary("md", md);

  // ---------- Static assets ----------
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // ---------- Collections ----------
  // Every Markdown file in src/publications/ is a publication (see publications.json).
  eleventyConfig.addCollection("publications", (api) =>
    api
      .getFilteredByGlob("src/publications/*.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  // ---------- Filters ----------
  eleventyConfig.addFilter("monthYear", (d) => {
    const date = new Date(d);
    return `${MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("readingTime", (html) => {
    const text = String(html || "")
      .replace(/<section class="footnotes"[\s\S]*<\/section>/, "")
      .replace(/<[^>]+>/g, " ");
    const words = text.split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.round(words / 225))} min read`;
  });
  eleventyConfig.addFilter("absoluteUrl", (path, base) => {
    try { return new URL(path, base).href; } catch { return path; }
  });
  eleventyConfig.addFilter("excludeUrl", (items, url) =>
    (items || []).filter((i) => i.url !== url)
  );

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
}
