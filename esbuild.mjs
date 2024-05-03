import esbuild from 'esbuild';

const mode = 'development';

const isDev = mode === 'development';
const isProd = mode === 'production';

esbuild
  .build({
    entryPoints: ['app/javascript/*.*'],
    outdir: 'app/assets/builds',
    entryNames: 'bundle.js',
    loader: '.js=jsx',
    bundle: true,
    minify: isProd,
    plugins: [],
  })
  .then(() => console.log('⚡ Build complete! ⚡'))
  .catch(() => process.exit(1));
