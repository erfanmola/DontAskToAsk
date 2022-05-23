const { defineConfig } = require('@vue/cli-service');
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  pwa: {
    name: 'DontAskToAsk',
    themeColor: '#e91e63',
    msTileColor: '#102631',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxOptions: {
      exclude: ['.htaccess'],
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
    404: {
        entry: 'src/main.js',
        template: 'public/index.html',
        filename: '404.html',
    },
  },
  outputDir: path.resolve(__dirname, "./docs/"),
})