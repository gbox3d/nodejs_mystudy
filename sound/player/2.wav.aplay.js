const Sound = require('aplay');

let _m = new Sound()


let count = 10;
_m.on('complete',()=>{
  count--;
  if(count > 0 )
  {
    console.log('next...')
    _m.play(`./TTS/${count}.wav`);

  }
  else {
    console.log('complete')
  }

})

_m.play(`./TTS/${count}.wav`);

