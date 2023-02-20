import axios from 'axios';

class Api {
    constructor (url, headers) {
      this._url = url
      this._headers = headers
    }

    // checkResponse (res) {
    //     return new Promise((resolve, reject) => {
    //       if (res.status === 201) {
    //         return resolve(res)
    //       }
    //     //   res.json().then(reject(data))
    //       const func = res.status < 400 ? resolve : reject
    //       res.json().then(data => func(data))
    //     })
    // }

    async createReceipt ({name = '', image = ''}) {
        // const token = localStorage.getItem('token')
        const response = await axios.post(
          this._url + '/create_receipt',
          {name: name, image: image}
        )
        return response
    }

    async getReceipt(id) {
        const response = await axios.get(this._url + '/receipts/' + id)
        return response;
    }

    async getReceiptList() {
      const response = await axios.get(this._url + '/receipts/')
      return response;
  }

    async patchReceipt (id, receipt) {
      const response = await axios.patch(
        this._url + '/receipts/' + id,
        {data: receipt.data}
      )
      return response
    }

}

export default new Api(import.meta.env.VITE_API_URL, { 'content-type': 'application/json' })