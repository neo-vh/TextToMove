const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/content.js'],
  bundle: true,
  outfile: 'dist/content.js',
  format: 'iife',
  platform: 'browser'
}).catch(() => process.exit(1));