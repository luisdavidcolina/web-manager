export const csvFileToArray = (string) => {
  const csvHeader = string.slice(0, string.indexOf('\n')).split(';')
  const csvRows = string.slice(string.indexOf('\n') + 1).split('\n')

  const newArray = csvRows.map((i) => {
    const values = i.split(';')
    const obj = csvHeader.reduce((object, header, index) => {
      object[header] = values[index].replaceAll(/"/g, '')
      return object
    }, {})
    return obj
  })
  return newArray.map((i) => {
    return {
      ID: i['"ID"'],
      LONGNAME : i['"LONGNAME"'],
      PRICE : i['"PRICE"']
    }
  })
}

export default csvFileToArray
