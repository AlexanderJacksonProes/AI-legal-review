// Site-wide settings. Edit the values in this file to change them everywhere.
export default {
  title: "The AI Legal Review",
  society: "University of Nottingham AI in Law Society",
  tagline: "A publication of the University of Nottingham AI in Law Society",
  description:
    "Analysis and commentary on artificial intelligence, law and the changing legal profession.",

  // The public address of the site. Render sets RENDER_EXTERNAL_URL automatically;
  // set SITE_URL (or edit the fallback) once you have a custom domain.
  url: (process.env.SITE_URL || process.env.RENDER_EXTERNAL_URL || "https://ai-legal-review.onrender.com").replace(/\/$/, ""),

  instagram: "https://www.instagram.com/uonaiinlawsoc/",
  instagramHandle: "@uonaiinlawsoc",

  // SUBMISSIONS — paste either a Google Form link or "mailto:your@address" here.
  // While this is empty, the Submit button points contributors to the Society's Instagram.
  submissionUrl: "",

  locale: "en_GB",
};
