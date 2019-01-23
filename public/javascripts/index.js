$(document).ready(() => {
  $('.toast').toast({delay: 5000})

  $('form').submit(e => {
    e.preventDefault()

    const data = {
      repository_url: $('#url').val()
    }

    fetch('http://localhost:3000/api/pulls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(result => {
      return result.json()
    })
    .then(result => {
      console.log('front end result', result);
      if (result.error) {
        $('.toast').toast('show')
        $('.toast-body').text(`${result.error.message}`)
      }
      else {
        result.forEach(pull => {
          $('tbody').append(
            `
            <tr>
            <th scope="row">${pull.author}</th>
            <td>${pull.title}</td>
            <td>${pull.commits.length}</td>
            <td>${pull.comments.length}</td>
            </tr>
            `
          )
        })
      }
    })
    
  })
})
