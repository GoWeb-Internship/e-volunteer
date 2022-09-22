module.exports = {
  webpack: cfg => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: 'frontmatter-markdown-loader',
      options: { mode: ['react-component'] },
    });
    cfg.resolve.fallback = { fs: false, path: false };
    return cfg;
  },
};
