'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WS_URL: '"augus.tunnel.echomod.cn/cwgl"',
  URL: '"/"'
})
