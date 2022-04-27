import { spawn } from 'child_process'
import fs from 'fs'
import getHandler from '@/pages/api/getHandler'
const itmFile = `${'c:\\Bootdrv\\Aloha\\newDATA\\ITM.DBF'}`
const itmFileData = `${'c:\\Bootdrv\\Aloha\\DATA\\ITM.DBF'}`
const stopFile = `${'c:\\Bootdrv\\Aloha\\STOP'}`
const stopFileTMP = `${'c:\\Bootdrv\\Aloha\\TMP\\STOP'}`

//const BAT = require.resolve()

const handler = getHandler()

handler.get(async (req, res) => {
  try {
    const bat = spawn('cmd.exe', [
      '/c',
      `C:\\BootDrv\\CFC\\InStoreBins\\AeMInStoreProcessor.exe /forceexport`,
    ])

    bat.stdout.on('data', (data) => {
      console.log(data.toString())
    })

    bat.stderr.on('data', (data) => {
      console.log(data.toString())
    })

    bat.on('exit', (code) => {
      console.log(`Child exited with code ${code}`)
      fs.copyFile(itmFile, itmFileData, (err) => {
        if (err) {
          res.json(err)
        } else {
          fs.copyFile(stopFile, stopFileTMP, (err) => {
            if (err) {
              res.json(err)
            } else {
              setTimeout(function(){
                fs.unlink(stopFileTMP, (err) => {
                  if (err) {
                    res.json(err)
                  } else {
                    res.json('ok')
                  }
                })
            }, 10000);
             
            }
          })
        }
      })
    })
  } catch (e) {
    console.log(e)
    res.json(e)
  }
})

export default handler
