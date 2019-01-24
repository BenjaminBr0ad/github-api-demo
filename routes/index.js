const express = require('express')
const fetch = require('node-fetch')
const qs = require('querystring')

const router = express.Router()
const { getData } = require('../controller/index')
const { checkUrl, formatUrl, formatResponse } = require('../utilities')

const options = {
  method: 'GET',
  headers: {
    'User-Agent': 'github-api-demo',
    'Accept': 'application/vnd.github.v3+json'
  }
}

router.post('/api/pulls', async (req, res, next) => {

  if (checkUrl(req.body.repository_url)) {

    const url = formatUrl(req.body.repository_url)
    const pulls = await getData(`https://api.github.com/repos/${url.owner}/${url.project}/pulls`)

    const response = await Promise.all(pulls.map(async pull => {
      const data = await Promise.all([getData(pull.commits_url, options), getData(pull.comments_url, options)])
      return formatResponse(pull, data)
    }))

    res.status(200).json(response)
  }
  else {

    next({
      status: 400,
      message: 'Must be valid GitHub URL.'
    })
  }

})

// router.get('/login', (req, res, next) => {
//   res.redirect(`https://github.com/login/oauth/authorize/?client_id=${process.env.CLIENT_ID}`)
// })



// router.all('/auth', (req, res) => {
//
//   const GITHUB_AUTH_ACCESSTOKEN_URL = 'https://github.com/login/oauth/access_token'
//   const CLIENT_ID = process.env.CLIENT_ID
//   const CLIENT_SECRET = process.env.CLIENT_SECRET
//   const CODE = req.query.code
//
//   const QUERY = qs.stringify({
//     client_id: CLIENT_ID,
//     client_secret: CLIENT_SECRET,
//     code: CODE
//   })
//
//   fetch(`${GITHUB_AUTH_ACCESSTOKEN_URL}/?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${CODE}`, {
//     method: 'POST',
//     redirect: 'follow',
//     mode: 'no-cors'
//   })
//   .then(response => {
//     console.log('success', response)
//     	res.redirect('http://localhost:3001/' + response)
//
//   })
//   .catch(error => {
//     console.log('error', error);
//   })
//
// })



module.exports = router
