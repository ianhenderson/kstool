var _fs = require('fs');
var uglyfyJS = require('uglify-js');
var env = process.env.NODE_ENV ? 'prod' : 'dev';
var FILE_ENCODING = 'utf-8';
var EOL = '\n';


//////////////////
// Source Files //
//////////////////

var source = {};
source.js = {};
source.js.vendor = {};
source.js.src = {};
source.css = {};
source.css.vendor = {};
source.css.src = {};

source.js.vendor.dev = [
  "public/lib/angular/angular.js",
  "public/lib/ui-router/release/angular-ui-router.js",
  "public/lib/angular-animate/angular-animate.js",
  "public/lib/angular-aria/angular-aria.js",
  "public/lib/angular-material/angular-material.js",
];

source.js.vendor.prod = [
  "public/lib/angular/angular.min.js",
  "public/lib/ui-router/release/angular-ui-router.min.js",
  "public/lib/angular-animate/angular-animate.min.js",
  "public/lib/angular-aria/angular-aria.min.js",
  "public/lib/angular-material/angular-material.min.js",
];

source.css.vendor.dev= [
  "public/lib/angular-material/angular-material.css",
];

source.css.vendor.prod= [
  "public/lib/angular-material/angular-material.min.css",
];

source.js.src= [
  "public/js/app.js",
];

source.css.src= [
  "public/styles/style.css",
];


/////////////////
// Build Utils //
/////////////////

function concat(opts) {

  var fileList = opts.src;
  var distPath = opts.dest;
  var out = fileList.map(function(filePath){
    return _fs.readFileSync(filePath, FILE_ENCODING);
  });

  _fs.writeFileSync(distPath, out.join(EOL), FILE_ENCODING);
  console.log(' '+ distPath +' built.');
}

function uglify(srcPath, distPath) {
  var ast = uglyfyJS.parse( _fs.readFileSync(srcPath, FILE_ENCODING) );
  var pro = uglyfyJS.uglify;

  // ast = pro.ast_mangle(ast);
  // ast = pro.ast_squeeze(ast);

  _fs.writeFileSync(distPath, (ast), FILE_ENCODING);
  console.log(' '+ distPath +' built.');
}

function build(){

  concat({
    src : source.js.vendor[env],
    dest : 'public/dist/vendor.js'
  });

  concat({
    src : source.js.src,
    dest : 'public/dist/main.js'
  });

  concat({
    src : source.css.vendor[env],
    dest : 'public/dist/vendor.css'
  });

  concat({
    src : source.css.src,
    dest : 'public/dist/main.css'
  });

  // uglify('public/dist/vendor.js', 'public/dist/vendor.min.js');

}

module.exports = build;