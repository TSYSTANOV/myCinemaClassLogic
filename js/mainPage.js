import { API_component } from "./api.js"

class Main_Page{
    ROOT_element
    page_number
    mediaType
    constructor(root){
        this.ROOT_element = root
    }
    async renderMainPage(param = 'trends', DATA_search_array, searchTitle){
        document.querySelector(this.ROOT_element).innerHTML = ''
        let setTitle = null

        let data = null
        switch (param) {
            case 'trends':
                data = await API_component.getTrending('day')
                this.mediaType = ''
                const headerSlider = await this.renderHeadSlider(data.results[0])
                document.querySelector(this.ROOT_element).prepend(headerSlider)
                setTitle = this.renderTitle('В тренде сегодня')
            break;
            case 'popular-movie':
                data = await API_component.getData('movie', 'popular')
                this.mediaType = 'movie'
                setTitle = this.renderTitle('Популярные фильмы')
            break;
            case 'popular-tv':
                data = await API_component.getData('tv', 'popular')
                this.typeOfContent = 'popular'
                this.mediaType = 'tv'
                setTitle = this.renderTitle('Популярные сериалы')
            break;
            case 'top-movie':
                data = await API_component.getData('movie', 'top_rated')
                this.typeOfContent = 'popular'
                this.mediaType = 'movie'
                setTitle = this.renderTitle('TOP фильмы')
            break;
            case 'top-tv':
                data = await API_component.getData('tv', 'top_rated')
                this.mediaType = 'tv'
                setTitle = this.renderTitle('TOP сериалы')
            break;
            case 'search':
                data = DATA_search_array
                    setTitle = this.renderTitle(`Результаты поиска по запросу: ${searchTitle}`)
                if(data.results.length === 0){
                    setTitle = this.renderTitle(`Ничего не найдено по запросу: ${searchTitle}`)
                }
            break;
        }
       
        this.page_number = data.page

        
        const section = document.createElement('section')
        section.className = 'other-films'
        const container = document.createElement('div')
        container.className = 'container'
        container.append(setTitle())
        container.append(this.renderContentList(data.results))



        section.append(container)
        document.querySelector(this.ROOT_element).append(section)

    }
    async renderHeadSlider(filmTrend){
        const {media_type, id} = filmTrend
        const videoPreview = await API_component.getVideoPreview(media_type, id)
    
        const section = document.createElement('section')
        section.className = 'film-week'
        section.innerHTML = `
        <div class="container film-week__container" data-rating="${filmTrend.vote_average.toFixed(1)}">
        <div class="film-week__poster-wrapper">
            <img class="film-week__poster" src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${filmTrend.backdrop_path}" alt="постер ${filmTrend.original_name}">
            <p class="film-week__title_origin">${filmTrend.original_name}</p>
        </div>
        <h2 class="film-week__title">${filmTrend.name}</h2>
        <a class="film-week__watch-trailer tube" target="_blank" href="https://youtu.be/${videoPreview.results[0].key}" aria-label="смотреть трейлер"></a>
        </div>`
        return section
    }
    renderTitle(text){
        let textToVisible = text
        return()=>{
            const h2 = document.createElement('h2')
            h2.className = 'other-films__title'
            h2.setAttribute('data-active-films', '')
            h2.setAttribute('data-type', '')
            h2.innerHTML = `${textToVisible}
                <span class="other-films__title-add">на TS Cinema</span>
            `
            return h2
        }
    }
    changeTitle(text){
        this.renderTitle(text)
    }
    renderContentList(data){
        const list = document.createElement('ol')
        list.className = 'other-films__list'
       
        Promise.allSettled(data.map(async(item)=>{
            let videoPreview = null
            if(item.media_type !== 'person'){
                videoPreview = await API_component.getVideoPreview(item.media_type ? item.media_type : this.mediaType, item.id)            
            }

            const li = document.createElement('li')
            li.className = 'other-films__item'

            const link = document.createElement('a')
            link.className = 'other-films__link'
            link.setAttribute('target','_blank')
            if(item.media_type !== 'person'){
                link.append(await this.loadImg(item.poster_path))
                link.setAttribute('data-rating',`${item.vote_average.toFixed(1)}`)
            }else{
                link.append(await this.loadImg(item.profile_path, true))
            }
            if(videoPreview !== null && videoPreview.results[0]){
                link.setAttribute('href', `https://youtu.be/${videoPreview.results[0].key}`)
            }

            li.append(link)

            return li
        })).then(listOfContent=>{
            listOfContent.forEach((el)=>{
                if(el.status === "fulfilled"){
  
                    list.append(el.value)
     
                }
                
            })
        })
      
        return list
    }
    loadImg(poster){
        return new Promise((resolve, reject) => {
                const img = document.createElement('img')
                img.className = 'other-films__img'
                img.setAttribute('alt',"постер")
                img.src = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${poster}`
                img.addEventListener('load',()=>{
                    resolve(img)
                })
        })
    }
}

const MAIN_PAGE_component = new Main_Page('main')

export {MAIN_PAGE_component}