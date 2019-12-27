const path = require('path')
// 解析CSS并将浏览器供应商前缀添加到规则的 PostCSS 插件
// vue-cli3.0 默认开启了 autoprefixer
// const autoprefixer = require('autoprefixer');
// 将px单位转换为视口单位的 (vw, vh, vmin, vmax) 的 PostCSS 插件
// const pxtoviewport = require('postcss-px-to-viewport');

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const publicPath = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {
  publicPath: publicPath, // 部署应用时的基本 URL(即项目前缀)，用法和 webpack 本身的 output.publicPath 一致，但是 Vue CLI 在一些其他地方也需要用到这个值，所以请始终使用 publicPath 而不要直接修改 webpack 的 output.publicPath。
  outputDir: 'dist', // 当运行 vue-cli-service build 构建项目时生成的生产环境构建文件的目录。注意目标目录在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。请始终使用 outputDir 而不要修改 webpack 的 output.path。
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。从生成的资源覆写 filename 或 chunkFilename 时，assetsDir 会被忽略。
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  filenameHashing: true, // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。然而，这也要求 index 的 HTML 是被 Vue CLI 自动生成的。
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      // title: 'Index Page'
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      // chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  }, // Type=Object,Default=undefined.在 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 是：1) 一个指定了 entry, template, filename, title 和 chunks 的对象 (除了 entry 之外都是可选的)；2) 或一个指定其 entry 的字符串
  lintOnSave: process.env.NODE_ENV !== 'production', // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md and https://github.com/neutrinojs/webpack-chain
  chainWebpack: config => { // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
    config.resolve.alias.set('@', resolve('src'))
    // config.externals({ 'BMap': 'BMap' }) // 添加百度地图
  },
  // https://github.com/survivejs/webpack-merge
  // 通过 webpack-merge 合并到最终的配置中，类似于以前版本的 webpack.base.conf.js module.exports = {}
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.less$/,
          use: [
            // ...其他 loader 配置
            // vant 主题自定义
            {
              loader: 'less-loader',
              options: {
                // 定制 vant 主题
                modifyVars: {
                  // 直接覆盖变量
                  // 'text-color': '#000',
                  // 'border-color': '#eee'

                  // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                  'hack': `true; @import "${resolve('src/theme/custom-theme.less')}";`
                }
              }
            }
          ]
        }
      ]
    }
  },
  css: {
    // 是否在 CSS Modules 中，去掉文件名中的 .module
    // requireModuleExtension: false,
    // 向 CSS 相关的 loader 传递选项
    loaderOptions: {
      // postcss: {
      //   plugins: [
      //     autoprefixer(),
      //     pxtoviewport({
      //       viewportWidth: 375
      //     })
      //   ]
      // },
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 注意：在 sass-loader v7 的版本中，这个选项名是 "data"。
        prependData: `@import "@/style/base/_var.scss";`
      }
    }
  },
  // 打包时不生成.map文件
  productionSourceMap: false,
  // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
  devServer: {
    port: 8090, // 端口号
    host: '0.0.0.0', // hosts
    proxy: {
      // 格式:(例如)
      // '/api/v1': {
      //   target: 'http://cnodejs.org',
      //   ws: true,
      //   changeOrigin: true
      // }
      '/dev/api/store': {
        target: 'https://shopsuite.yaoyingli.com',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
