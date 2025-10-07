import fs from 'fs';
import path from 'path';
import { terser } from 'rollup-plugin-terser';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const copyRecursiveCSS = (srcDir: string, destDir: string) => {
  fs.mkdirSync(destDir, { recursive: true });

  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);

    if (entry.isDirectory()) {
      copyRecursiveCSS(srcPath, destPath);
    } else if (entry.name.endsWith('.css')) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
};

export default defineConfig(() => {
  return {
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        fileName: format => `kubit-ui-web-react-charts.${format}.js`,
        formats: ['es', 'cjs', 'umd'],
        name: 'KubitCharts',
      },
      target: 'es2022',
      minify: 'terser',
      outDir: 'dist',
      rollupOptions: {
        output: {
          plugins: [
            {
              ...terser({
                compress: {
                  drop_console: true,
                  drop_debugger: true,
                },
              }),
              apply: (outputOptions: any) => outputOptions.format === 'es',
            },
          ],
        },
      },
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    plugins: [
      dts({
        insertTypesEntry: true,
        outDir: 'dist/types',
        rollupTypes: false,
        tsconfigPath: './tsconfig.build.json',
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  };
});
