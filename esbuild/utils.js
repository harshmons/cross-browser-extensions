const fs = require("fs/promises");
const path = require('path');

const shouldMinify = () => {
    let shouldMinify = true;
    const minifyIndex = process.argv.indexOf("--minify");
    if(minifyIndex !== -1){
      const minifyFlag = process.argv[minifyIndex + 1].toLowerCase();
      shouldMinify = minifyFlag === 'false'? false: true;
    }
    return shouldMinify;
}

const shouldEnableSourceMap = () =>{
    let enableSourceMap = false;
    const sourceMapIndex = process.argv.indexOf("--sourcemap");
    if(sourceMapIndex !== -1){
      const sourceMapFlag = process.argv[sourceMapIndex + 1].toLowerCase();
      enableSourceMap = sourceMapFlag === 'false'? false: true;
    }
    return enableSourceMap;
}

const endPlugin = (browserName)=>({
  name: 'end',
  setup(build) {
    build.onEnd(async () => {
      console.log("BROWSERNAME>>>> :",browserName)
      // const projectFolder = path.join(__dirname,'..', 'dist', 'chrome','content');
      // await fs.mkdir(projectFolder);
      
      // var src = path.join(__dirname,'..', 'dist', 'chrome','src','content');
      // var dest = path.join(__dirname,'..', 'dist', 'chrome','content');
      // await fs.cp(src, dest,{recursive:true} )
      
      // var dir = path.join(__dirname,'..','dist','chrome','src')
      // await fs.rmdir(dir,{recursive:true})

      // Moving content folder
      var oldPath1 = path.join(__dirname,'..', 'dist', browserName,'src','scripts','content');
      var newPath1 = path.join(__dirname,'..', 'dist',browserName,'content');
      await fs.rename(oldPath1,newPath1);
      var dir = path.join(__dirname,'..','dist',browserName,'src')
      await fs.rmdir(dir,{recursive:true})

      // Moving background folder
      var oldPath = path.join(__dirname,'..', 'dist', browserName,'browsers',browserName,'background');
      var newPath = path.join(__dirname,'..', 'dist', browserName,'background');
      await fs.rename(oldPath,newPath);
      var dir = path.join(__dirname,'..','dist',browserName,'browsers')
      await fs.rmdir(dir,{recursive:true})
    })
  },
})

module.exports = {
    shouldMinify,
    shouldEnableSourceMap,
    endPlugin
}