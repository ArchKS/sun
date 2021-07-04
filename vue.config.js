module.exports = {
    css: {
      loaderOptions: {
        postcss: {
          plugins: [require('tailwindcss'), require('autoprefixer')]
        }
      }
    },
    runtimeCompiler: true,
    pages: {
      index: {
        entry: 'src/main.js',
        template: 'src/public/index.html',
        filename: 'index.html',
        title: '时光刻印',
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      },
    },
    
  
  }