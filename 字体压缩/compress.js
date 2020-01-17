var fs = require('fs');

fs.readFile('./index/index.bundle.js',function(err,data){
if(err){
  console.log("bad")
}else{
  var t = data.toString();
  var reg = /[\u4e00-\u9fa5]/g;
  var names = t.match(reg);
  var tt = names.join("");
  console.log(tt);
    
    }
  })
    