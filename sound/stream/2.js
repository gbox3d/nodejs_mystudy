const fs = require('fs');
const wav = require('wav');
const Speaker = require('speaker');

const _speaker = new Speaker(
  {
    audioFormat: 1,
    endianness: 'LE',
    channels: 1,
    sampleRate: 16000,
    byteRate: 32000,
    blockAlign: 2,
    bitDepth: 16,
    signed: true,
    lowWaterMark: 0,
    highWaterMark: 0
  }
)


const { Readable } = require('stream');

const inStream = new Readable({});

let _chks = []
let files = ['../player/TTS/test.wav','../player/TTS/100.wav','../player/TTS/void.wav','../player/TTS/10.wav',];
let _index = 0;

function _loop() {

  var reader = new wav.Reader();
  let _fs = fs.createReadStream(files[_index])

  reader.on('end',()=> {

    _index++
    console.log(_index)

    if(_index >= files.length) {
      //console.log(_chks)

      _chks.forEach(_=> {
        inStream.push(_)
      })
      // inStream.push(_chks[0])
      // inStream.push(_chks[1])
      // inStream.push(_chks[2])
      inStream.push(null)

      inStream.pipe(_speaker)

    }
    else {
      _loop()
    }

  });

  reader.on('data',(chuck)=> {
    _chks.push(chuck)


  })

  _fs.pipe(reader)

}

_loop()

/*
var file_100 = fs.createReadStream('../player/TTS/100.wav');
var file_10 = fs.createReadStream('../player/TTS/10.wav');


let _chk = []
reader.on('data',function (chuck) {

  console.log(chuck.length)
  console.log(chuck)
  _chk.push(chuck)
  //inStream.push(chuck)
  // inStream.pipe(_speaker)
  
})

reader.on('end',()=> {
  console.log('end')
  inStream.push(_chk[0])
  inStream.push(null);
  inStream.pipe(_speaker)
})


file_100.pipe(reader)

 */