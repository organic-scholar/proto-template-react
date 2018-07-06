let path = require('path');


function resolveApp(relativePath) {
  return path.resolve(__dirname + '/../' + relativePath);
}

module.exports = {
    build: resolveApp('dist'),
    web: resolveApp('web'),
    src: resolveApp('src'),
    nodeModules: resolveApp('node_modules'),
    webModules: resolveApp('web_modules'),
};
