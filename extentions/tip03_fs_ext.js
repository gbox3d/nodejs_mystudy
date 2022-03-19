import fs from 'fs-extra'

const _tmp_dir = './tmp'
const file = './file.txt'

// With async/await:
async function example() {
    try {
        // await fs.ensureDir('./tmp')
        // await fs.ensureFile(file) //없으면 빈파일만들기 
        // console.log('success!')
        // await fs.appendFile(file,(new Date).toISOString()+'\n','utf-8')
        // await fs.copy(file,file+'.bak') //파일카피

        //기존 fs 함수를 사용할수있다.
        // let _ = await fs.readFile(file,'utf8')
        // console.log(_)

        await fs.remove(_tmp_dir)
        console.log(`remove ${_tmp_dir}`)
        await fs.remove(file)
        console.log(`remove : ${file}`)
        
    } catch (err) {
        console.error(err)
        console.log('create file')
    }
}

example();
