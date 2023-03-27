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
  async moviesGet () {
    return mockData.allMovies
    // const url = this.domain + '/movies'
    // const response = await this.sendRequest(url)
  }
  
  async movieSessionsGet(id = 0){
    if (id) return mockData.sessionFilm
    return mockData.allSessions
    // const url = this.domain + '/movieShows'
    // const response = await this.sendRequest(url)
    // console.log(response)
  }
}

export default new YellowMediaAPI('https://cinema-api-test.y-media.io/v1')


