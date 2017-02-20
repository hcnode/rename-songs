var fs = require('fs');
var mm = require('musicmetadata');
var queue = [];
var path = process.cwd();
var dirs = fs.readdirSync(path);
dirs.forEach((dir) => {
  if(fs.statSync(path).isDirectory() && dir.indexOf('.') != 0){
    var files = fs.readdirSync(path + '\\' + dir);
    files.forEach((file) => {
      if(fs.statSync(path + '\\' + dir + '\\' + file).isFile() && /\.mp3$/.test(file) && !/\d{3}_/.test(file)){
        queue.push(function(){
          var parser = mm(fs.createReadStream(path + '\\' + dir + '\\' + file), function (err, metadata) {
            if (err) throw err;
            if(metadata.track){
              var prefix = '000' + metadata.track.no;
              prefix = prefix.substr(prefix.length - 3);
              var newName = path + '\\' + dir + '\\' + prefix + '_' + file;
              console.log(newName);
              fs.renameSync(path + '\\' + dir + '\\' + file, newName);
            }
          });
        });
      }
    })
  }
});

queue.reduce((promise, func) => {
  return promise.then(func);
}, Promise.resolve()).then(() => {
  console.log('done.')
});

