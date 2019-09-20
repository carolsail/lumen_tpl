import babel from 'rollup-plugin-babel'
import nodeResolvePlugin from 'rollup-plugin-node-resolve'
import commonJSPlugin from 'rollup-plugin-commonjs'
import { uglify } from "rollup-plugin-uglify";

var fs= require("fs")
const pkg = require('./package.json')

const plugins = [
  nodeResolvePlugin({ browser: true }),
  commonJSPlugin(),
  babel({
    // only transpile our source code
    exclude: 'node_modules/**',
    presets: [
      ["@babel/env", {
        "modules": false,
        "targets": {
          "browsers": [ "ie >= 8", "chrome >= 62" ]
        }  
      }]
    ],
    plugins: [
      '@babel/external-helpers'
    ],
  })
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(uglify())
}

/** 
* 根据是否存在js决定是否生产
*/
var output = []

if(fs.existsSync('./src/frontend.js')){
  output.push({
    input: './src/frontend.js',
    output: [
      {
        file: pkg.frontend,
        format: 'iife',
        name: 'I',
        sourcemap: false
      }
    ],
    plugins: plugins
  })
}

if(fs.existsSync('./src/backend.js')){
  output.push({
    input: './src/backend.js',
    output: [
      {
        file: pkg.backend,
        format: 'iife',
        name: 'I',
        sourcemap: false
      }
    ],
    plugins: plugins
  })
}

export default output