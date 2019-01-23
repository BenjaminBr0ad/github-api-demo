const fetch = require('node-fetch')

const getData = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      'User-Agent': 'BenjaminBr0ad',
      'Accept': 'application/vnd.github.v3+json'
    }
  }
  try {
    const response = await fetch(url, options)
    const json = await response.json()
    return json
  }
  catch (error) {
    console.log('getData() error: ', error);
    return error
  }
}

module.exports = {
  getData
}
