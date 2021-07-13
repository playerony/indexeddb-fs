import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const input = 'lib/index.ts';

export default [
  // ES Modules
  {
    input,
    output: {
      format: 'es',
      file: 'dist/index.es.js',
    },
    plugins: [typescript({ tsconfig: 'tsconfig.build.json' }), babel({ extensions: ['.ts'] })],
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
      typescript({ tsconfig: 'tsconfig.build.json' }),
      babel({ extensions: ['.ts'], exclude: 'node_modules/**' }),
      terser(),
    ],
  },
];
