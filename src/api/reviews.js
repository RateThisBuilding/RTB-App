import { POSTOpts } from './'

const API_ROOT = 'http://ratethisbuilding.com/api/buildings_1/comment'

const addReview = function(params, CSRFtoken){

  return fetch(`${API_ROOT}.json`, { ...POSTOpts(CSRFtoken),
    body: JSON.stringify({
      nid:  params.buildingId,
      subject: params.subject,
      // Drupal form keys...
      // You'd wish for a more user-friendly name, eh? ;)
      comment_body: {
        und: [
          {
            value: params.comments,
            format: 'filtered_html'
          }
        ]
      },
      field_rating: {
        und: [
          {
            rating: params.rating
          }
        ]
      }
      // "comment_body[und][0][value]": params.comments,
      // "comment_body[und][0][format]": 'filtered_html',
      // "field_rating[und][0][rating]": params.rating
    }),
    mimeType: "multipart/form-data",
  }).then(response => {
    if (!response.ok) {
      return response.json().then(respBody => {
        throw Error(respBody.form_errors)
      })
    }
    else return response.json()
  })
}

export default {
  addReview
}
