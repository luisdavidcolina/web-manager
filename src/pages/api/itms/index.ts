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

const itmFile = `${'c:\\Bootdrv\\Aloha\\newDATA\\ITM.DBF'}`
const itmFileData = `${'c:\\Bootdrv\\Aloha\\DATA\\ITM.DBF'}`
const fieldDescriptors: any = [
  { name: 'ID', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'OWNERID', type: 'N', size: 5, decimalPlaces: 0 },
  { name: 'USERNUMBER', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'SHORTNAME', type: 'C', size: 15, decimalPlaces: 0 },
  { name: 'CHITNAME', type: 'C', size: 15, decimalPlaces: 0 },
  { name: 'LONGNAME', type: 'C', size: 25, decimalPlaces: 0 },
  { name: 'LONGNAME2', type: 'C', size: 25, decimalPlaces: 0 },
  { name: 'BOHNAME', type: 'C', size: 20, decimalPlaces: 0 },
  { name: 'ABBREV', type: 'C', size: 4, decimalPlaces: 0 },
  { name: 'TAXID', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'TAXID2', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'VTAXID', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'PRIORITY', type: 'N', size: 3, decimalPlaces: 0 },
  { name: 'ROUTING', type: 'N', size: 3, decimalPlaces: 0 },
  { name: 'PRINTONCHK', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'COMBINE', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'HIGHLIGHT', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'SURCHARGE', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'SURCHRGMOD', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'COST', type: 'N', size: 15, decimalPlaces: 4 },
  { name: 'MOD1', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'MOD2', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'MOD3', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'MOD4', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'MOD5', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'MOD6', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'MOD7', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'MOD8', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'MOD9', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'MOD10', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'ASKDESC', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'ASKPRICE', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'ISREFILL', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'VROUTING', type: 'N', size: 3, decimalPlaces: 0 },
  { name: 'IS_KVI', type: 'N', size: 2, decimalPlaces: 0 },
  { name: 'TRACKFOH', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'PRICE_ID', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'PRICE', type: 'N', size: 15, decimalPlaces: 3 },
  { name: 'SLAVETOITM', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'DEFWEIGHT', type: 'N', size: 1, decimalPlaces: 0 },
  { name: 'SKU', type: 'C', size: 15, decimalPlaces: 0 },
  { name: 'MODPRICE', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'ITEMMULT', type: 'N', size: 3, decimalPlaces: 0 },
  { name: 'ITEMPERCNT', type: 'N', size: 5, decimalPlaces: 2 },
  { name: 'MODPRICEID', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'MOD_PRICE', type: 'N', size: 15, decimalPlaces: 2 },
  { name: 'AMPRI', type: 'N', size: 3, decimalPlaces: 0 },
  { name: 'NEVERPRINT', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'PRTRECIPE', type: 'N', size: 2, decimalPlaces: 0 },
  { name: 'NOGRATUITY', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'COMPOSITID', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'ADISPRECP', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'INDEPENDNT', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'PRINTHELD', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'DONOTSHOW', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'DONOTSHWM', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'SHOWNDPNT', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'GIFTCERT', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'ITEMHILITE', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'DELAYTIME', type: 'N', size: 9, decimalPlaces: 0 },
  { name: 'LABEL', type: 'N', size: 3, decimalPlaces: 0 },
  { name: 'GUESTS', type: 'N', size: 8, decimalPlaces: 2 },
  { name: 'SITEFLAGS', type: 'N', size: 9, decimalPlaces: 0 },
  { name: 'FLEXTAX', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'CASHCARD', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'CONCEPT', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'MULTIPLIER', type: 'N', size: 3, decimalPlaces: 0 },
  { name: 'SKU2', type: 'C', size: 15, decimalPlaces: 0 },
  { name: 'SKU3', type: 'C', size: 15, decimalPlaces: 0 },
  { name: 'SKU4', type: 'C', size: 15, decimalPlaces: 0 },
  { name: 'SKU5', type: 'C', size: 15, decimalPlaces: 0 },
  { name: 'REVITEM', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'CON1STMOD', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'CHITJUST', type: 'N', size: 2, decimalPlaces: 0 },
  { name: 'CHITBOLD', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'FLEXTAX2', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'DNTSHWSM', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'SWTRCKSM', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'GIFTCARD', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'GCACTIVATE', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'GCADDVALUE', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'TOKENOVER', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'TOKENQTY', type: 'N', size: 4, decimalPlaces: 0 },
  { name: 'GUESTWGHT', type: 'N', size: 8, decimalPlaces: 3 },
  { name: 'DNTSHWSMMD', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'USEBKCLR', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'BKRED', type: 'N', size: 3, decimalPlaces: 0 },
  { name: 'BKGREEN', type: 'N', size: 3, decimalPlaces: 0 },
  { name: 'BKBLUE', type: 'N', size: 3, decimalPlaces: 0 },
  { name: 'USETXTCLR', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'TXTRED', type: 'N', size: 3, decimalPlaces: 0 },
  { name: 'TXTGREEN', type: 'N', size: 3, decimalPlaces: 0 },
  { name: 'TXTBLUE', type: 'N', size: 3, decimalPlaces: 0 },
  { name: 'DISPBMP', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'BITMAPFILE', type: 'C', size: 12, decimalPlaces: 0 },
  { name: 'HIDETXT', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'CHITNAME2', type: 'C', size: 15, decimalPlaces: 0 },
  { name: 'CTXPNLID', type: 'N', size: 6, decimalPlaces: 0 },
  { name: 'MDSPCTXPNL', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'PIZZA', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'TOPPING', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'INITTOP', type: 'N', size: 2, decimalPlaces: 0 },
  { name: 'PIZZASIZE', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'MUSTBWHOLE', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'FRACTION', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'FRACTYPE', type: 'N', size: 4, decimalPlaces: 0 },
  { name: 'FRACPRCOVR', type: 'N', size: 4, decimalPlaces: 0 },
  { name: 'TYPE', type: 'N', size: 1, decimalPlaces: 0 },
  { name: 'FSITEM', type: 'C', size: 1, decimalPlaces: 0 },
  { name: 'FSMATRIX', type: 'N', size: 10, decimalPlaces: 0 },
  { name: 'EXPORTID', type: 'N', size: 8, decimalPlaces: 0 },
  { name: 'CAMPROVIDE', type: 'N', size: 1, decimalPlaces: 0 },
  { name: 'PLANINDEX', type: 'N', size: 2, decimalPlaces: 0 },
  { name: 'CAMACTION', type: 'N', size: 1, decimalPlaces: 0 },
  { name: 'OCCTAX', type: 'N', size: 10, decimalPlaces: 0 },
]
const handler = getHandler()

handler.get(async (req, res) => {
  let dbf = await DBFFile.open(itmFile)
  let records = await dbf.readRecords(1000)
  res.json(records)
})

handler.post(async (req, res) => {
  try {
    const { body } = req
    let dbfOrg = await DBFFile.open(itmFile)
    let records = await dbfOrg.readRecords()
    fs.unlink(itmFile, async (err) => {
      if (err) {
        console.log(err)
      }
      let dbf = await DBFFile.create(itmFile, fieldDescriptors)
      await dbf.appendRecords(records)
      fs.unlink(itmFileData, async (err2) => {
        if (err2) {
          console.log(err2)
        }
        let dbf2 = await DBFFile.create(itmFileData, fieldDescriptors)
        await dbf2.appendRecords(records)
        const { ID, PRICE } = body
        sql.connect(config, function (err) {
          if (err) console.log(err)
          let query = `UPDATE Item
          SET DefaultPrice = '${PRICE}'
          WHERE Number = '${ID}'`

          sql.query(query, (error, results, fields) => {
            if (error) {
              return console.error(error.message)
            }
            logger.info(JSON.stringify(results))
          })
        })
      })

      res.json('ok')
    })
  } catch (e) {
    console.log(e)
    res.json(e)
  }
})

export default handler
