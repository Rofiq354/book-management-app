module.exports = Seo = (req, page = '') => {
  return {
    documentTitle: `Book Management App ${page}`,
    description: "",
    fullUrl: req.protocol + "://" + req.get("host") + req.originalUrl,
    ogImage: "",
    favIcon: "",
  };
};
