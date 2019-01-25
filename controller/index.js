const model = require('../model/index')

const getData = (url) => {
  const options = {
    method: 'GET',
    headers: {
      'User-Agent': 'github-api-demo',
      'Accept': 'application/vnd.github.v3+json'
    }
  }
  
  return model.getData(url, options)
}

module.exports = {
  getData
}
