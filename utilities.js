const checkUrl = (url) => {
  const reg = /(https:\/\/github.com\/[\w-_.]+\/[\w-_.]+)/g
  return reg.test(url)
}

const formatUrl = (url) => {
  return {
    url: url,
    owner: url.split('/')[3],
    project: url.split('/')[4]
  }
}

const formatResponse = (pull, data) => {
  return {
    title: pull.title,
    author: pull.user.login,
    commits: data[0],
    comments: data[1]
  }
}

module.exports = {
  checkUrl,
  formatUrl,
  formatResponse
}
