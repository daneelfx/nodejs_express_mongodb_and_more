const fs = require('fs')
const superagent = require('superagent')

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('There was an error finding the file')
      resolve(data)
    })
  })
}

readFilePro(`${__dirname}/dog.txt`).then(data => {
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then(res => {
      fs.writeFile('dog-img.text', res.body.message, err => {
        console.log('Random image saved')
      })
    })
    .catch(err => {
      console.log('There was an error')
    })
})
