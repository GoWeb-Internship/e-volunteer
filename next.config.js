const { i18n } = require('./next-i18next.config');
const nextTranslate = require("next-translate");

module.exports = {
  i18n:{
    locales: ["ru", "uk"],
    defaultLocale: 'ru'
  },
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['react-component'] },
    });
    return cfg;
  },
};
