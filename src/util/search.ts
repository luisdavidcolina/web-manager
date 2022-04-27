export const search = (string: String, string2: String) => {
  let t = string.toLocaleLowerCase()
  let t2 = string2.toLocaleLowerCase()
  return t.search(t2) > -1
}
export default search
