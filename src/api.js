class API {
  constructor(domain) {
    this.domain = domain
  }
  async sendRequest (url = '/', params = {}) {
    let response = await fetch(url, params)
    try {
      response = await response.json()
    } catch (err){
      console.log(err)
    }
    return response
  }

  moviesGet () { }

  movieSessionsGet () { }

}

class YellowMediaAPI extends API {
  async moviesGet (query) {
    let url = this.domain + '/movies'
    url += `?${new window.URLSearchParams(query)}`
    const response = await this.sendRequest(url)
    return response
  }

  async movieSessionsGet (id) {
    const url = this.domain + `/movieShows?movie_id=${id}`
    return await this.sendRequest(url)
  }

  async getMovieById (id) {
    const response = await this.moviesGet({ movie_id: id })
    return response
  }

  async getPlaces (query) {
    let url = this.domain + '/showPlaces'
    url += `?${new window.URLSearchParams(query)}`
    const response = await this.sendRequest(url)
    return response.data
  }

  async bookPlace (query) {
    let url = this.domain + '/bookPlace'
    const params = {
      method: 'POST',
      body: JSON.stringify(query)
    }
    const response = await this.sendRequest(url, params)
    return response
  }
}

export default new YellowMediaAPI('https://cinema-api-test.y-media.io/v1')


