module.exports = {
  publicPath: './',
  devServer: {
    open: false,
    port: 8800,
    proxy: {
      '/musicApi': {
        target: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/musicApi': ''
        }
      },
      '/songListApi': {
        target: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/songListApi': ''
        }
      },
      '/searchApi':{
        target: 'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/searchApi': ''
        }
      },
      '/searchMusicApi':{
        target: 'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/searchMusicApi': ''
        }
      },
      '/api': {
        target: 'http://127.0.0.1/demo/api',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
      }
    }
  },

}
