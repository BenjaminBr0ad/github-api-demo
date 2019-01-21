// document.addEventListener('DOMContentLoaded', function(){
//   const form = document.querySelector("form")
//   const input = document.querySelector("#url")
//   form.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const data = {
//       repository_url: input.value
//     }
//     console.log(input.value);
//
//   }) // END EVENT LISTENER
// }) // END DOMCONTENTLOADED

$(document).ready(() => {
  $('form').submit(e => {
    e.preventDefault()
    const data = {
      repository_url: $('#url').val()
    }
    fetch('https://github-api-demo-bbroad.herokuapp.com/api/pulls', {
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
    })

  })
})
