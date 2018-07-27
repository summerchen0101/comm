const path = require("path");
const fs = require("fs");
var ZipPlugin = require('zip-webpack-plugin');
const moment = require("moment")

module.exports = {
  outputDir: "dist",
  assetsDir: "static",
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://platformapi.thoth-dev.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
      }
    }
  },
  configureWebpack: {
    plugins: [
      new ZipPlugin({
        // OPTIONAL: defaults to the Webpack output path (above)
        // can be relative (to Webpack output path) or absolute
        path: 'archive',
   
        // OPTIONAL: defaults to the Webpack output filename (above) or,
        // if not present, the basename of the path
        filename: `dist-${moment().format("YYYY-MM-DDTHHmmss")}.zip`,
   
        // OPTIONAL: defaults to 'zip'
        // the file extension to use instead of 'zip'
        // extension: 'ext',
   
        // // OPTIONAL: defaults to the empty string
        // // the prefix for the files included in the zip file
        // pathPrefix: 'relative/path',
   
        // // OPTIONAL: defaults to the identity function
        // // a function mapping asset paths to new paths
        // pathMapper: function(assetPath) {
        //   // put all pngs in an `images` subdir
        //   if (assetPath.endsWith('.png'))
        //     return path.join(path.dirname(assetPath), 'images', path.basename(assetPath));
        //   return assetPath;
        // },
   
        // // OPTIONAL: defaults to including everything
        // // can be a string, a RegExp, or an array of strings and RegExps
        // include: [/\.js$/],
   
        // // OPTIONAL: defaults to excluding nothing
        // // can be a string, a RegExp, or an array of strings and RegExps
        // // if a file matches both include and exclude, exclude takes precedence
        // exclude: [/\.png$/, /\.html$/],
   
        // // yazl Options
   
        // // OPTIONAL: see https://github.com/thejoshwolfe/yazl#addfilerealpath-metadatapath-options
        // fileOptions: {
        //   mtime: new Date(),
        //   mode: 0o100664,
        //   compress: true,
        //   forceZip64Format: false,
        // },
   
        // // OPTIONAL: see https://github.com/thejoshwolfe/yazl#endoptions-finalsizecallback
        // zipOptions: {
        //   forceZip64Format: false,
        // },
      })
    ]
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        // use: [require('nib')()],
				import: [
					// '~nib/lib/nib/index.styl',
					path.resolve(__dirname, './src/vendor/FPKG-20000-Style/main.styl'),
					// path.resolve(__dirname, './src/vendor/FPKG-20000-Style/_variables.styl'),
					// path.resolve(__dirname, './src/vendor/FPKG-20000-Style/_mixins.styl'),
				] // 指向自定義主題文件
      }
    },
  }
};
