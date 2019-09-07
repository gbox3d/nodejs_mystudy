const fs = require('fs');
const wav = require('wav');
const Speaker = require('speaker');



function _loop() {
  setTimeout(()=> {

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

    var file2 = fs.createReadStream('../player/TTS/void.wav');
    var file = fs.createReadStream('../player/TTS/1000.wav');
    var reader = new wav.Reader();
    var reader2 = new wav.Reader();

    // reader.on('end',()=> {
    //   console.log('end')
    //
    // })



    setInterval(()=> {

      _speaker.end();

      file.pipe(reader)
      reader.pipe(_speaker)

    },3000)
    // file2.pipe(reader2)
    // reader2.pipe(_speaker)
    //
    // setTimeout()


    _loop()

  },1000);

}

_loop()
