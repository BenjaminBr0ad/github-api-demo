const model = require('../model/index')

const getData = (url, options) => {
  return model.getData(url,options)
}

module.exports = {
  getData
}
