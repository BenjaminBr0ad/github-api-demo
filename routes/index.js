const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()

/* GET home page. */

const getData = async (url, options) => {
  try {
    const response = await fetch(url, options)
    const json = await response.json()
    return json
  }
  catch (error) {
    console.log('getData() error: ', error);
  }
}

router.get('/api/pulls', async (req, res, next) => {
  const url = req.body.repository_url
  const owner = url.split('/')[3]
  const project = url.split('/')[4]
  const options = {
    method: 'GET',
    headers: {
      'User-Agent': 'BenjaminBr0ad',
      'Accept': 'application/vnd.github.v3+json'
    }
  }
  const pulls = await getData(`https://api.github.com/repos/${owner}/${project}/pulls`, options)
  let newMap = pulls.map(async pull => {
    let obj = {}
    const promises = [getData(pull.commits_url), getData(pull.comments_url)]
    const data = await Promise.all(promises)
    obj.title = pull.title
    obj.author = pull.user.login
    obj.commits = data[0]
    obj.comments = data[1]
    return obj
  })
  let final = await Promise.all(newMap)
  console.log(final);
  res.status(200).json(final)
})

module.exports = router
