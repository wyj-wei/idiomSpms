const webpack = require("webpack");
module.exports = {
  publicPath: "./", //根路径
  outputDir: "dist", // 构建输出目录
  assetsDir: "assets", // 静态资源目录
  lintOnSave: false, // 是否开启eslint保存检测，有效值 true||false||'error'
  devServer: {
    open: true, // 项目构造是否自动打开
    // host: "localhost", // 主机号
    // port: 8080, // 端口号
    https: false,
    hotOnly: false, // 热更新
    proxy: {
      //如需跨域请求多个域名，在此对象进行扩展即可
      "/api": {
        target: "https://vuets-api.herokuapp.com/api/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
