import axios from 'axios';

class Api {
    constructor (url, headers) {
      this._url = url
      this._headers = headers
    }

    checkResponse (res) {
        return new Promise((resolve, reject) => {
          if (res.status === 201) {
            return resolve(res)
          }
        //   res.json().then(reject(data))
          const func = res.status < 400 ? resolve : reject
          res.json().then(data => func(data))
        })
    }

    createRecipe ({
        name = '',
        image = ''
        }) {
        // const token = localStorage.getItem('token')
        // return fetch(
        return fetch(
          this._url + '/create_receipt',
          {
            method: 'POST',
            headers: {
              ...this._headers,
            //   'authorization': `Token ${token}`
            },
            body: JSON.stringify({
              name,
              image
            })
          }
        ).then(this.checkResponse)
    }
}

export default new Api(import.meta.env.VITE_API_URL, { 'content-type': 'application/json' })