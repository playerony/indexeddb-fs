import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const input = 'lib/index.ts';

export default [
  // ES Modules
  {
    input,
    output: {
      format: 'es',
      file: 'dist/index.es.js',
    },
    plugins: [
      nodePolyfills(),
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
      babel({ extensions: ['.ts'] }),
      nodeResolve({ preferBuiltins: false }),
      commonjs(),
    ],
  },

  // UMD
  {
    input,
    output: {
      format: 'umd',
      indent: false,
      name: 'indexeddb-fs',
      file: 'dist/index.umd.min.js',
    },
    plugins: [
      nodePolyfills(),
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
      babel({ extensions: ['.ts'], exclude: 'node_modules/**' }),
      terser(),
      nodeResolve({ preferBuiltins: false }),
      commonjs(),
    ],
  },
];
