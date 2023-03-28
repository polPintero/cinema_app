import mockData from '@/mockData'

class API {
  constructor (domain) {
    this.domain = domain
  }
  async sendRequest(url = '/'){
    let response = await fetch(url)
    response = await response.json()
    return response
  }

  moviesGet(){}

  movieSessionsGet(){}

}

class YellowMediaAPI extends API {
  async moviesGet (query) {
    let url = this.domain + '/movies'
    url += `?${new window.URLSearchParams(query)}`
    const response = await this.sendRequest(url)
    return response
  }
  
  async movieSessionsGet(id){
    const url = this.domain + `/movieShows?id=${id}`
    const response = await this.sendRequest(url)
    console.log(response)
  }

  async getMovieById(id){
    const response = await this.moviesGet({movie_id: id})
    return response
  }
}

export default new YellowMediaAPI('https://cinema-api-test.y-media.io/v1')


