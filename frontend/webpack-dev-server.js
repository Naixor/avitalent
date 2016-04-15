var webpack = require("webpack");
var webpackDevServer = require('webpack-dev-server');
var config = require("./webpack.config.js");

// config.entry.main.unshift("webpack-dev-server/client?http://localhost:3000", "webpack/hot/only-dev-server");
var compiler = webpack(config, function (err, states) {

});
var server = new webpackDevServer(compiler, {
    hot: true,
    contentBase: __dirname,
    proxy: {
        "/images/*": {
            target: "http://localhost:3000",
            rewrite: function (req) {
                req.url = 'src' + req.url;
            }
        },
        "/get/*": {
            target: "http://localhost:3000/src/mock",
            rewrite: function (req) {
                req.url = req.url.replace(/^\/get\/(\S+)/, (a, param) => {
                    return `/${param}.json`;
                });
            }
        }
    }
});
server.listen(3000);