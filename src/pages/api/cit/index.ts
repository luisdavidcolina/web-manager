import { DBFFile } from 'dbffile'
import fs from 'fs'
import sql from 'mssql'
import getHandler from '@/pages/api/getHandler'
import logger from '@/pages/api/log'
const config = {
  user: 'sa',
  password: 'Soporte23',
  server: 'ALOHABOH\\SQLEXPRESS',
  database: 'CFCStandaloneDB',
  options: {
    trustServerCertificate: true,
  },
}

const citFile = `${'c:\\Bootdrv\\Aloha\\newDATA\\CIT.DBF'}`

const handler = getHandler()

handler.get(async (req, res) => {
  let dbf = await DBFFile.open(citFile)
  let records = await dbf.readRecords(1000)
  res.json(records)
})
/*
handler.post(async (req, res) => {
  try {
    const { body } = req
    const { ID, PRICE } = body
    sql.connect(config, function (err) {
      if (err) console.log(err)
      let query = `UPDATE Item
      SET DefaultPrice = '${PRICE}'
      WHERE Number = '${ID}'`

      sql.query(query, (error, results, fields) => {
        if (error) {
          res.json(error)
          logger.error(error)
        }
        logger.info(JSON.stringify(results))
        res.json('ok')
      })
    })
  } catch (e) {
    console.log(e)
    res.json(e)
  }
})
*/
export default handler
