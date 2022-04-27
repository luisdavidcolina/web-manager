export const getData = async () => {
  try {
    const response = await fetch('/api/itms')
    const data = await response.json()
    const newData = data.sort((a, b) => {
      if (a.ID > b.ID) {
        return 1
      }
      if (a.ID < b.ID) {
        return -1
      }
      return 0
    })
    return newData
  } catch (error: any) {
    console.error(error.message)
  }
}

export default getData
