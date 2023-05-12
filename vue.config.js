const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  outputDir: "../Tourmates-Server/src/main/resources/static",

  devServer: {
    proxy: {
      '/api': {
        target: "http://localhost:8080",
        changeOrigin: true,
      }
    }
  }
})
