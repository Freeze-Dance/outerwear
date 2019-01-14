const logThings = (obj, ...things) => {
  console.log(
    Object.entries(obj).filter((key, value) => {
      return things.includes(key)
    })
  )
}
module.exports = logThings
