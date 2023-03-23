const babel = require('@rollup/plugin-babel');
const { terser } = require('rollup-plugin-terser');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('rollup-plugin-typescript2');
const polyfills = require('rollup-plugin-polyfill-node');
const { nodeResolve } = require('@rollup/plugin-node-resolve');

const input = 'lib/index.ts';

module.exports = [
  // ES Modules
  {
    input,
    output: {
      format: 'es',
      file: 'dist/index.es.js',
      exports: 'named',
    },
    plugins: [
      polyfills(),
      typescript({
        tsconfig: 'tsconfig.build.json',
        typescript: require('ttypescript'),
        tsconfigDefaults: {
          compilerOptions: {
            plugins: [
              { transform: 'typescript-transform-paths' },
              { transform: 'typescript-transform-paths', afterDeclarations: true },
            ],
          },
        },
      }),
      babel({
        extensions: ['.ts'],
        babelHelpers: 'bundled',
      }),
      nodeResolve({ preferBuiltins: false }),
      commonjs(),
    ],
  },
  // UMD
  {
    input,
    output: {
      format: 'umd',
      file: 'dist/index.umd.min.js',
      name: 'indexeddb-fs',
      exports: 'named',
      indent: false,
    },
    plugins: [
      polyfills(),
      typescript({
        tsconfig: 'tsconfig.build.json',
        typescript: require('ttypescript'),
        tsconfigDefaults: {
          compilerOptions: {
            plugins: [
              { transform: 'typescript-transform-paths' },
              { transform: 'typescript-transform-paths', afterDeclarations: true },
            ],
          },
        },
      }),
      babel({
        extensions: ['.ts'],
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
      }),
      terser(),
      nodeResolve({ preferBuiltins: false }),
      commonjs(),
    ],
  },
];
