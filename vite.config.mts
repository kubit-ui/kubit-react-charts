import react from '@vitejs/plugin-react';

import fs from 'fs';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// Constants for array indexing
const EMPTY_LENGTH = 0;
const SECOND_INDEX = 1;
const THIRD_INDEX = 2;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Plugin to generate index.js files for each chart folder
 * This enables subpath imports like '@kubit-ui-web/react-charts/charts/lineChart'
 */
const generateChartIndexPlugin = () => {
  const generateIndexFile = (sourceContent: string, format: 'cjs' | 'esm'): string => {
    const lines: string[] = [];
    const exportWildcardPattern = /export\s+\*\s+from\s+['"]([^'"]+)['"]/g;
    const namedExportPattern = /export\s+{([^}]+)}\s+from\s+['"]([^'"]+)['"]/g;

    // Process wildcard exports
    let match = exportWildcardPattern.exec(sourceContent);
    while (match !== null) {
      const importPath = match[SECOND_INDEX];
      const fileName = path.basename(importPath);
      const targetFile = `./${fileName}.js`;

      if (format === 'esm') {
        lines.push(`export * from '${targetFile}';`);
      } else {
        const reexport = `module.exports = { ...module.exports, ...require('${targetFile}') };`;
        lines.push(reexport);
      }
      match = exportWildcardPattern.exec(sourceContent);
    }

    // Process named exports
    let namedMatch = namedExportPattern.exec(sourceContent);
    while (namedMatch !== null) {
      const names = namedMatch[SECOND_INDEX];
      const importPath = namedMatch[THIRD_INDEX];
      const fileName = path.basename(importPath);
      const targetFile = `./${fileName}.js`;

      if (format === 'esm') {
        lines.push(`export { ${names} } from '${targetFile}';`);
      } else {
        const namedList = names.split(',').map(n => n.trim());
        lines.push(`const { ${namedList.join(', ')} } = require('${targetFile}');`);
        lines.push(`module.exports = { ...module.exports, ${namedList.join(', ')} };`);
      }
      namedMatch = namedExportPattern.exec(sourceContent);
    }

    return lines.join('\n') + '\n';
  };

  return {
    closeBundle() {
      const srcCharts = path.resolve(__dirname, 'src/charts');
      const outputDirs = [
        {
          dir: path.resolve(__dirname, 'dist/esm/charts'),
          format: 'esm' as const,
        },
        {
          dir: path.resolve(__dirname, 'dist/cjs/charts'),
          format: 'cjs' as const,
        },
      ];

      // Get all chart directories
      const charts = fs
        .readdirSync(srcCharts, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      charts.forEach(chart => {
        const srcIndexPath = path.join(srcCharts, chart, 'index.ts');

        // Only process if source index.ts exists
        if (!fs.existsSync(srcIndexPath)) {
          return;
        }

        outputDirs.forEach(({ dir, format }) => {
          const chartDir = path.join(dir, chart);
          if (!fs.existsSync(chartDir)) {
            return;
          }

          // Read source index.ts to get exports
          const sourceContent = fs.readFileSync(srcIndexPath, 'utf-8');

          // Generate index.js with re-exports
          const content = generateIndexFile(sourceContent, format);

          if (content.trim().length > EMPTY_LENGTH) {
            const indexPath = path.join(chartDir, 'index.js');
            fs.writeFileSync(indexPath, content, 'utf-8');
          }
        });
      });

      // eslint-disable-next-line no-console
      console.log('[generate-chart-index] ✓ Generated index.js files for charts');
    },
    name: 'generate-chart-index',
  };
};

/**
 * Plugin to remove unnecessary folders from dist
 * Removes __tests__, __mocks__, __fixtures__, stories, and .DS_Store files
 */
const removeUnnecessaryFoldersPlugin = () => {
  return {
    closeBundle() {
      const dirsToRemove = [
        path.resolve(__dirname, 'dist/esm/__tests__'),
        path.resolve(__dirname, 'dist/cjs/__tests__'),
        path.resolve(__dirname, 'dist/esm/__mocks__'),
        path.resolve(__dirname, 'dist/cjs/__mocks__'),
        path.resolve(__dirname, 'dist/esm/__fixtures__'),
        path.resolve(__dirname, 'dist/cjs/__fixtures__'),
        path.resolve(__dirname, 'dist/esm/stories'),
        path.resolve(__dirname, 'dist/cjs/stories'),
        path.resolve(__dirname, 'dist/types/__tests__'),
        path.resolve(__dirname, 'dist/types/__mocks__'),
        path.resolve(__dirname, 'dist/types/__fixtures__'),
        path.resolve(__dirname, 'dist/types/stories'),
      ];

      dirsToRemove.forEach(dir => {
        if (fs.existsSync(dir)) {
          fs.rmSync(dir, { force: true, recursive: true });
          // eslint-disable-next-line no-console
          console.log(`[remove-unnecessary] ✓ Removed ${path.relative(__dirname, dir)}`);
        }
      });

      // Remove .DS_Store files
      const removePattern = path.resolve(__dirname, 'dist/**/.DS_Store');
      const dsStoreFiles = glob.sync(removePattern);
      dsStoreFiles.forEach(file => {
        if (fs.existsSync(file)) {
          fs.rmSync(file, { force: true });
        }
      });

      if (dsStoreFiles.length > EMPTY_LENGTH) {
        // eslint-disable-next-line no-console
        console.log(`[remove-unnecessary] ✓ Removed ${dsStoreFiles.length} .DS_Store files`);
      }

      // Remove test files from dist
      const testPatterns = [
        path.resolve(__dirname, 'dist/**/*.test.js'),
        path.resolve(__dirname, 'dist/**/*.test.d.ts'),
        path.resolve(__dirname, 'dist/**/*.stories.js'),
        path.resolve(__dirname, 'dist/**/*.stories.d.ts'),
      ];

      testPatterns.forEach(pattern => {
        const files = glob.sync(pattern);
        files.forEach(file => {
          if (fs.existsSync(file)) {
            fs.rmSync(file, { force: true });
          }
        });
        if (files.length > EMPTY_LENGTH) {
          // eslint-disable-next-line no-console
          console.log(`[remove-unnecessary] ✓ Removed ${files.length} test/story files`);
        }
      });
    },
    name: 'remove-unnecessary-folders',
  };
};

/**
 * Vite configuration for building the library
 * Optimized for production builds with Vite 8 Beta (Rolldown-powered)
 * Rolldown provides 10-30x faster builds than Rollup with native Rust performance
 */
export default defineConfig(({ mode }) => ({
  build: {
    // Improved chunk size warnings with better defaults
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'KubitCharts',
    },
    // Rolldown uses Oxc minifier (faster than terser)
    minify: true,
    // Enhanced module preloading for better performance
    modulePreload: {
      polyfill: false, // Disable polyfill for smaller bundles
    },
    outDir: 'dist',
    // Report compressed size to see gzipped bundle sizes
    reportCompressedSize: true,
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react/jsx-dev-runtime',
        'react-transition-group',
      ],
      output: [
        // ESM with individual modules
        {
          dir: 'dist/esm',
          entryFileNames: '[name].js',
          exports: 'named',
          format: 'es',
          // Improved hoisting for smaller bundles
          hoistTransitiveImports: false,
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
        // CJS with individual modules
        {
          dir: 'dist/cjs',
          entryFileNames: '[name].js',
          exports: 'named',
          format: 'cjs',
          // Improved hoisting for smaller bundles
          hoistTransitiveImports: false,
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      ],
      // Enhanced treeshaking with better defaults (Rolldown + Oxc semantic analysis)
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
      },
    },
    // Disable sourcemaps to prevent Vite from resolving back to source files
    sourcemap: false,
  },
  // Enhanced caching for faster rebuilds (Rolldown module-level persistent cache)
  cacheDir: 'node_modules/.vite',
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  // Optimized dependency pre-bundling with Rolldown
  optimizeDeps: {
    include: [],
    // Disable discovery for library builds
    noDiscovery: true,
  },
  plugins: [
    react({
      // Enhanced React plugin options for Vite 8
      babel: {
        babelrc: false,
        configFile: false,
      },
      jsxImportSource: 'react',
      jsxRuntime: 'automatic',
    }),
    dts({
      exclude: [
        'src/**/*.test.*',
        'src/**/__tests__',
        'src/**/__mocks__',
        'src/**/__fixtures__',
        'src/**/stories',
        'src/**/*.stories.*',
      ],
      insertTypesEntry: true,
      outDir: 'dist/types',
      rollupTypes: true,
      tsconfigPath: './tsconfig.build.json',
    }),
    generateChartIndexPlugin(),
    removeUnnecessaryFoldersPlugin(),
  ],
  // Improved resolve options with native tsconfig paths support (Vite 8)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/charts': path.resolve(__dirname, 'src/charts'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
    },
    // Better defaults for library builds
    dedupe: ['react', 'react-dom'],
    // Enable native tsconfig paths support (Vite 8 feature)
    tsconfigPaths: true,
  },
}));
