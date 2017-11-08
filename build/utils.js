'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const glob = require('glob')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const merge = require('webpack-merge')

exports.getEntries = function () {
  if (!/\*/.test(config.pageEntry)) {
    // single page
    return { 'index': config.pageEntry }
  }
  else {
    // multi page
    let entries = {}
    glob.sync(config.pageEntry).forEach(function (path) {
      let split = path.split('/')
      let name = split[split.length - 2]
      entries[name] = path
    })
    return entries
  }
}

exports.getRewrites = function () {
  let entries = exports.getEntries()
  let rewrites = []
  Object.keys(entries).forEach(function (name) {
    let reg = new RegExp('^\/' + name + '$')
    rewrites.push({
      from: reg, 
      to: '\/' + name + '.html'
    })
  })
  return rewrites
}

exports.htmlPlugins = function () {
  let entries = exports.getEntries()
  let plugins = []
  Object.keys(entries).forEach(function (name) {
    let conf = {
      filename: name + '.html',
      template: entries[name].slice(0, -3) + '.html',
      inject: true,
      chunks: ['manifest', 'vendor', name]
    }
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
    }
    plugins.push(new HtmlWebpackPlugin(conf))
  })
  return plugins
}

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}
