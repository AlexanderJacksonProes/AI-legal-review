// Settings shared by every publication in this folder.
// Each article's URL is /publications/<file-name-without-.md>/
export default {
  layout: "layouts/article.njk",
  ogType: "article",
  permalink: (data) =>
    data.page.inputPath.endsWith(".md") ? `/publications/${data.page.fileSlug}/` : data.permalink,
};
