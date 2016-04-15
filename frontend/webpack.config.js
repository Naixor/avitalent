var _ = require('lodash');
var webpack = require('webpack');
var minimist = require('minimist');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var react_path = path.resolve(node_modules, 'react/dist/react.min.js');
var react_dom_path = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');
var react_router_path = path.resolve(node_modules, 'react-router/umd/RectRouter.min.js');
var jquery_path = path.resolve(node_modules, 'jquery/dist/jquery.min.js');

var DEFAULT_TARGET = 'DEV';

var TARGET = getTarget(DEFAULT_TARGET);

function replaceHtmlTagPlugin(options) {
    this.replaceMents = options;
}

replaceHtmlTagPlugin.prototype.apply = function(compiler) {
    var replaceMents = this.replaceMents;
    compiler.plugin("compilation", function(compilation) {
        compilation.plugin("html-webpack-plugin-before-html-processing", function(htmlPluginData, callback) {
            Object.keys(replaceMents).forEach(function (key) {
                htmlPluginData.html = htmlPluginData.html.replace(new RegExp(key, 'g'), replaceMents[key]);
            });
            callback();
        });
    });
};

var DEFAULT_CONF = {
    target: 'web',
    entry: {
        main: ["./src/main.tsx"],
    },
    output: {
        publicPath: '',
        filename: '[name].[chunkhash].js',
        sourceMapFilename: '[name].[chunkhash].map',
    },
    resolve: {
        extensions: ["", '.webpack.js', '.web.js', ".ts", ".tsx", ".js"],
        alias: {
            // "react": react_path,
            // "react-dom": react_dom_path,
            // "react-router": react_router_path,
            // "jquery": jquery_path
        }
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'react-hot!ts-loader?jsx=true', exclude: /(\.test.ts$|node_modules)/},
            { test: /\.(ico|png|jpg|gif|svg|eot|ttf|woff|woff2)(\?.+)?$/, loader: 'url-loader?limit=50000'},
            { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
            { test: /\.(png|jpg|gif)$/, loader: 'file-loader?name=img/[hash].[ext]' }
        ],
        preLoaders: [
            { test: /\.json$/, loader: "json" },
            { test: /\.js$/, loader: "source-map-loader" }
        ],
        noParse: /\.min\.js/
    },
    externals: {
    },
    plugins: [
        new replaceHtmlTagPlugin({
            '<!-- webpack-dev-server -->': TARGET === 'DEV' ? '<script src="http://localhost:3000/webpack-dev-server.js"></script>' : ''
        }),
        new ExtractTextPlugin("main.css"),
        new HtmlWebPackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new webpack.optimize.DedupePlugin()
    ].concat(_bootswatchWorkaround()),
    devServer: {
        hot: true,
        contentBase: './',
        port: 3000
    },
    debug: true,
    progress: true,
    colors: true
};

var PER_CONF = {
    DEV: {
        devtool: 'inline-source-map',
        output: {
            path: path.resolve(__dirname, './dev'),
            filename: '[name].js'
        },
        plugins: [
            new OpenBrowserWebpackPlugin({ url: 'http://localhost:3000/', browser: '' }),
            // new webpack.HotModuleReplacementPlugin()
        ]
    },
    DIST: {
        debug: false,
        entry: {
            main: ["./src/main.tsx"],
            vendor: ["react", "react-dom", "react-router", "radium"]
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'bundle.js'
        },
        externals: {
            // "react": "React",
            // "react-dom": "ReactDOM",
            // "react-router": "ReactRouter",
            // "lodash": "_"
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                filename: "vendor.js",
                minChunks: Infinity
            }),
            new webpack.optimize.UglifyJsPlugin()
        ]
    },
    BUILD: {
        output: {
            path: path.resolve(__dirname, './build')
        },
        devtool: 'source-map',
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('libs.js', ['react', 'react-dom', 'react-router']),
        ]
    }
};

module.exports = _.mergeWith(DEFAULT_CONF, PER_CONF[TARGET], _mergeArraysCustomizer);

function getTarget(default_target) {
    var target = minimist(process.argv.slice(2)).TARGET;
    if (!~['DEV', 'DIST', 'BUILD'].indexOf(target)) {
        return default_target;
    }
    return target;
}

function _mergeArraysCustomizer(a, b) {
    if (_.isArray(a)) {
        return a.concat(b);
    }
}

function _bootswatchWorkaround() {
	var extensions = ['png', 'jpg'];
	
	return extensions.map(function(ext) {
		var regexp = new RegExp('^images\/(\S+)\.' + ext + '$');
		return new webpack.NormalModuleReplacementPlugin(regexp, function (res) {
            res.request = path.resolve('src', res.request);
        });
	});
}