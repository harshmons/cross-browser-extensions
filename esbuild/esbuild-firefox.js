const esbuild = require("esbuild");
const {copy} = require("esbuild-plugin-copy")
const {shouldMinify,shouldEnableSourceMap,endPlugin} = require("./utils");
const fs = require("fs/promises");
const path = require('path');

console.log(process.argv);



esbuild
  .build({
    entryPoints: [
      "./browsers/firefox/background/index.ts",
      "./src/scripts/content/**"
    ],
    bundle: true,
    minify: shouldMinify(),
    sourcemap: shouldEnableSourceMap(),
    target: ["firefox57"],
    outdir: "./dist/firefox",
    // outbase:"browsers/firefox",
    define: {
      "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`
    },
    plugins: [
        copy({
          assets: [
            {
              from: ['./src/html/*'],
              to: ['html'],
            },
            {
                from: ['./browsers/firefox/manifest.json'],
                to: [''],
            },
          ],
        }),
        endPlugin('firefox')
      ],
  })
  .catch(() => process.exit(1));
