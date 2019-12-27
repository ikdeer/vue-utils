module.exports = {
  plugins: {
    autoprefixer: {},
    // 将px单位转换为视口单位的 (vw, vh, vmin, vmax) 的 PostCSS 插件
    'postcss-px-to-viewport': {
      // options
      viewportWidth: 375
    }
  }
}
