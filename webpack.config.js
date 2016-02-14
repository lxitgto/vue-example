/**
 * Created by ethan-liu on 16/1/3.
 */
var path = require("path")
var webpack = require('webpack');

module.exports = {
    entry: {
        app: "./app/app.js",
        vendor: ['vue']
    },
    output: {
        path: "./assets",
        filename: "bundle.js"
    },
    resolve: {
        root: [path.join(__dirname, 'bower_components'), path.join(__dirname, 'app')],
        alias: {},
        extensions: ['', '.js', '.json']
    },
    externals: {
        "jquery": "jQuery"
    },
    module: {
        loaders: [
            {test: /\.html$/, loader: 'html'},
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {test: /\.styl$/, loader: 'style-loader!css-loader!stylus-loader'},
            {test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff'},
            {test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff'},
            {test: /\.ttf$/, loader: 'file-loader'},
            {test: /\.eot$/, loader: 'file-loader'},
            {test: /\.svg$/, loader: 'file-loader'},
            {test: /\.vue$/, loader: 'vue-loader'},
            {
                test: /\.js$/,
                exclude: '/node_modules|vue\/dist/|bower_components',
                include: [path.resolve(__dirname, "app")],
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    plugins: ['transform-runtime']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vue.js'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Vue: 'vue'
        }),
        //new webpack.optimize.UglifyJsPlugin({
        //    compress: {
        //        warnings: false
        //    }
        //}),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        )
    ]
}