const { i18n } = require('./next-i18next.config');
// const nextTranslate = require("next-translate");

module.exports = {
  i18n,
  // ...nextTranslate(),

  webpack: (cfg, { isServer }) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['react-component'] },
    });

    cfg.resolve.fallback = { fs: false, path: false };

    if (isServer) {
      require('./scripts/cache');
    }

    return cfg;
  },
};
