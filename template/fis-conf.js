//vi foo/index.js
var path = require('path')
var fis = module.exports = require('fis3');

fis.cli.name = 'smui-fis3';
fis.cli.info = require('./package.json');

fis.hook('commonjs', {
  baseUrl: '/src'
});


//不编译静态发布目录
INGNORE_FILE_LIST = [
  '/dist/**', '/node_modules/**', 'asset/**', 'cpc_static/**', '/test', '/doc','fis-conf.js',
  '.**','package.json','*.sh','epipe-rules.js', '*.md', '*.sh'];

fis.set('project.ignore', INGNORE_FILE_LIST);


fis.match('*', {
  release: '/portal/$0' // 所有资源发布时产出到 /static 目录下
});

fis.match('*.js', {
  parser: fis.plugin('babel-5.x'),
  isMod: true
});

fis.match('resource/**.js', {
  isMod: false
});

fis.match('src/(**.vue)', {
  parser: fis.plugin('vuex'),
  rExt: '.js',
  isMod: true
});

// fis-parser-less
fis.match('*.less', {
  rExt: '.css',
  parser: fis.plugin('less-2.x')
});

// fis.match('*.{css,less}', {
//   optimizer: fis.plugin('clean-css')
// });

// fis.match('*.png', {
//   optimizer: fis.plugin('png-compressor')
// });

// dev 只编译pages目录
fis.media('dev')
  .set('project.ignore', INGNORE_FILE_LIST)
  .match('::package', {
     postpackager: fis.plugin('loader', {
        useInlineMap: true,
        allInOne: false
     })
  })

//fis3-hook-module
// fis.hook('module', {
//   mode: 'amd' // 模块化支持 amd 规范，适应 require.js
// });


// 添加全局变量
fis.set('namespace', 'sm');