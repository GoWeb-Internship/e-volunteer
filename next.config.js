const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,

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
    const fileLoaderRule = cfg.module.rules.find(
      rule => rule.test && rule.test.test('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;
    cfg.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack'),
    });
    return cfg;
  },
};

module.exports = {
  webpack(config) {
   
    return config;
  },
};

