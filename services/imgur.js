/* eslint eqeqeq: "off" */
const request = require('request')

exports.getImage = (search, page = 1) => {
  return new Promise((resolve, reject) => {
    let options = {
      url: `https://api.imgur.com/3/gallery/search/${page}?q=${search}`,
      headers: { Authorization: 'Client-ID 915c8d7944932ee' },
      json: true
    }

    function getPics (err, res, body) {
      if (!err && res.statusCode == 200) {
        body = body.data.filter(img => {
          if (!img.is_album) {
            return img
          }
        }).map(img => {
          return {
            url: img.link,
            snippet: img.title,
            context: `https://imgur.com/${img.id}`
          }
        })
        resolve(body)
      }
    }
    request(options, getPics)
  })
}

