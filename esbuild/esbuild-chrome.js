const esbuild = require("esbuild");
const {copy} = require("esbuild-plugin-copy")
const {shouldMinify,shouldEnableSourceMap,endPlugin} = require("./utils");
const fs = require("fs/promises");
const path = require('path');

console.log(process.argv);

// let endPlugin = (browserName)=>({
//   name: 'end',
//   setup(build) {
//     build.onEnd(async () => {
//       console.log("BROWSERNAME>>>> :",browserName)
//       // const projectFolder = path.join(__dirname,'..', 'dist', 'chrome','content');
//       // await fs.mkdir(projectFolder);
      
//       // var src = path.join(__dirname,'..', 'dist', 'chrome','src','content');
//       // var dest = path.join(__dirname,'..', 'dist', 'chrome','content');
//       // await fs.cp(src, dest,{recursive:true} )
      
//       // var dir = path.join(__dirname,'..','dist','chrome','src')
//       // await fs.rmdir(dir,{recursive:true})

//       // Moving content folder
//       var oldPath1 = path.join(__dirname,'..', 'dist', browserName,'src','content');
//       var newPath1 = path.join(__dirname,'..', 'dist',browserName, 'content');
//       await fs.rename(oldPath1,newPath1);
//       var dir = path.join(__dirname,'..','dist',browserName,'src')
//       await fs.rmdir(dir,{recursive:true})

//       // Moving background folder
//       var oldPath = path.join(__dirname,'..', 'dist', browserName,'browsers',browserName,'background');
//       var newPath = path.join(__dirname,'..', 'dist', browserName,'background');
//       await fs.rename(oldPath,newPath);
//       var dir = path.join(__dirname,'..','dist',browserName,'browsers')
//       await fs.rmdir(dir,{recursive:true})
//     })
//   },
// })

esbuild
  .build({
    entryPoints: [
      "./browsers/chrome/background/index.ts",
      "./src/scripts/content/**"
    ],
    bundle: true,
    minify: shouldMinify(),
    sourcemap: shouldEnableSourceMap(),
    target: ["chrome58"],
    outdir: "./dist/chrome",
    // outbase:"browsers/chrome",
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
                from: ['./browsers/chrome/manifest.json'],
                to: [''],
            },
          ],
        }),
        endPlugin('chrome')
      ],
  })
  .catch(() => process.exit(1));
