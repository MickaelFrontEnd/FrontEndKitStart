exports.SERVER = {
  PORT: 5000,
  ROOT: 'app/views',
  PROXY: 'http://localhost:5000'
};

exports.VIEWS = {
  SRC: './app/views/**/*.pug',
  DEST: './dist/html' 
};


exports.STYLES = {
  SRC: './app/styles/global.styl',
  DEST: './dist/css' 
};

exports.SCRIPTS = {
  SRC: './app/scripts/App.js',
  DEST: './dist/js'
};

exports.IMAGES = {
  SRC: './app/img/**/*.png',
  DEST: './dist/img'
};

exports.FONTS = {
  SRC: './app/fonts/**/*.+(ttf|otf|woff|eot|svg)',
  DEST: './dist/fonts'
};