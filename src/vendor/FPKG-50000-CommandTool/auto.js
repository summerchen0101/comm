let fs = require('fs')
var _ = require('lodash')
require('dotenv').load();

var ncp = require('ncp').ncp;
 
ncp.limit = 16;
var vendorPath = process.cwd() + '/src/vendor'
var copySorce = vendorPath + '/FPKG-50000-CommandTool/DemoPKG'

var PKG_USER = process.env.PKG_USER
var PKG_NAME = process.argv[2]
var PKG_TITLE = process.argv[3]
var PKG_PATH = ""
fs.readdir(vendorPath, function(err, items) {
  let PKG_NUMBER = items.length + 1
  PKG_PATH = `${vendorPath}/FPKG-${PKG_NUMBER}0000-${PKG_NAME}`
  
  ncp(copySorce, PKG_PATH, function (err) {
    if (err) {
      return console.error(err);
    }
    var renameDirs = [
      {from: `${PKG_PATH}/component/Demo.vue`, to: `${PKG_PATH}/component/${PKG_NAME}.vue`},
      {from: `${PKG_PATH}/style/component/Demo.styl`, to: `${PKG_PATH}/style/component/${PKG_NAME}.styl`},
    ]

    renameDirs.forEach((v, index) => {
      fs.rename(v.from, v.to, function(err) {
        if ( err ) console.log('ERROR: ' + err);
      });
    })

    const replaceStringOptions = {
      // files: [
      //   `${PKG_PATH}/component/${PKG_NAME}.vue`,
      //   `${PKG_PATH}/style/component/${PKG_NAME}.styl`,
      // ],
      files: `${PKG_PATH}/**`,
      from: [/demo/g, /Demo/g, /範例/g, /PKG_USER/g, /PKG_NAME/g],
      to: [_.kebabCase(PKG_NAME), PKG_NAME, PKG_TITLE, PKG_USER, PKG_NAME],
    };


    var replace = require('replace-in-file');

    replace(replaceStringOptions)
      .then(changes => {
        console.log(`Modified files:${changes.length}`);
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });

  });

  

  
});
