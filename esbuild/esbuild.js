const esbuild = require("esbuild");
const {copy} = require("esbuild-plugin-copy")

esbuild
  .build({
    entryPoints: [
      "./src/background/index.ts",
      "./src/content/**",
    ],
    bundle: true,
    minify: true,
    sourcemap: process.env.NODE_ENV !== "production",
    target: ["chrome58", "firefox57"],
    outdir: "./dist",
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
                from: ['./src/manifest.json'],
                to: [''],
            },
          ],
        }),
      ],
  })
  .catch(() => process.exit(1));
