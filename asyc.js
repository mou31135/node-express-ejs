asyncFunc(cb, cb, cb);

function asyncFunc (running, done,hi) {
  for (var i = 0;i<10;i++) {
    running('i = ' + i);
  }
  done('done');
   for (var j = 0;j<4;j++) {
    hi('j = ' + j);
  }
}

function cb (str) {
  console.log(str);
}