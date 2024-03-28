
class API{
    BASE_URL
    options
    language
    constructor(url, options, language){
        this.BASE_URL = url
        this.options = options
        this.language = language
    }
    getTrending(period, page = 1){
        return fetch(`${this.BASE_URL}trending/all/${period}?language=${this.language}&page=${page}`, this.options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
    }
    getVideoPreview(type, id){
        try{
            return fetch(`${this.BASE_URL}${type}/${id}/videos?language=${this.language}`, this.options)
        .then(response => {
            if(response.ok){
                return response.json()
            }
        })
        .then(response => response)
        .catch(err => console.error(err));
        }
        catch(error){
            console.log(error)
        }
    }
    getData(mediaType, type, page = 1){
        return fetch(`https://api.themoviedb.org/3/${mediaType}/${type}?language=${this.language}&page=${page}`, this.options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
    }
    getSearch(searchItem, page = 1){
        return fetch(`https://api.themoviedb.org/3/search/multi?query=${searchItem}&include_adult=false&language=${this.language}&page=${page}`, this.options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
    }

}

const API_component = new API('https://api.themoviedb.org/3/', {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWFiYzc5NzEyMDQzNDI2ZjU3YTYxMzVjNTBlMDE3NiIsInN1YiI6IjY1YmU2MWM1OTMxZWExMDBjOTk5YzhjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZHdKVEPrV0syXnjwGnqD8hUPUJeUV0zmClH3ZIalo9w'
    }
  },'ru-RU')
export {API_component}