const fetch = require('node-fetch')

const getData = async (url, options) => {

  try {
    const response = await fetch(url, options)
    const json = await response.json()
    return json
  }
  
  catch (error) {
    return error
  }

}

module.exports = {
  getData
}
