const express = require('express')

const router = express.Router()
const { getData } = require('../controller/index')
const { checkUrl, formatUrl, formatResponse } = require('../utilities')

router.post('/api/pulls', async (req, res, next) => {

  if (checkUrl(req.body.repository_url)) {

    const url = formatUrl(req.body.repository_url)
    const pulls = await getData(`https://api.github.com/repos/${url.owner}/${url.project}/pulls`)

    const response = await Promise.all(pulls.map(async pull => {
      const data = await Promise.all([getData(pull.commits_url), getData(pull.comments_url)])
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

module.exports = router
