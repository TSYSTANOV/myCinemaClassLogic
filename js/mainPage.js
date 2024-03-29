import { API_component } from "./api.js";
import { HEADER_component } from "./header.js";
import { Spinner } from "./spinner.js";

class Main_Page {
  ROOT_element;
  page_number;
  mediaType;
  contentType;
  constructor(root) {
    this.ROOT_element = root;
  }
  async renderMainPage(param = "trends", DATA_search_array, searchTitle) {
    document.querySelector(this.ROOT_element).innerHTML = "";
    let SPINNER_element = null
    if(param === 'trends'){
      SPINNER_element = new Spinner(document.querySelector(this.ROOT_element))
      SPINNER_element.renderSpinner()
    }

    
    let setTitle = null;
    let data = null;
    switch (param) {
      case "trends":
        data = await API_component.getTrending("day");
        this.mediaType = "";
        this.contentType = "trends";

        const headerSlider = await this.renderHeadSlider(data.results[0], SPINNER_element);
        document.querySelector(this.ROOT_element).prepend(headerSlider);
        setTitle = this.renderTitle("В тренде сегодня");
        break;
      case "popular-movie":
        data = await API_component.getData("movie", "popular");
        this.mediaType = "movie";
        this.contentType = "popular";
        setTitle = this.renderTitle("Популярные фильмы");
        break;
      case "popular-tv":
        data = await API_component.getData("tv", "popular");
        this.typeOfContent = "popular";
        this.mediaType = "tv";
        this.contentType = "popular";
        setTitle = this.renderTitle("Популярные сериалы");
        break;
      case "top-movie":
        data = await API_component.getData("movie", "top_rated");
        this.typeOfContent = "popular";
        this.mediaType = "movie";
        this.contentType = "top_rated";
        setTitle = this.renderTitle("TOP фильмы");
        break;
      case "top-tv":
        data = await API_component.getData("tv", "top_rated");
        this.mediaType = "tv";
        this.contentType = "top_rated";
        setTitle = this.renderTitle("TOP сериалы");
        break;
      case "search":
        data = DATA_search_array;
        setTitle = this.renderTitle(
          `Результаты поиска по запросу: ${searchTitle}`
        );
        if (data.results.length === 0) {
          setTitle = this.renderTitle(
            `Ничего не найдено по запросу: ${searchTitle}`
          );
        }
        break;
    }

    this.page_number = data.page;

    const section = document.createElement("section");
    section.className = "other-films";
    const container = document.createElement("div");
    container.className = "container";
    container.append(setTitle());
    const SPINNER_component = new Spinner(container)
    SPINNER_component.renderSpinner()
    container.append(this.renderContentList(data.results, null, SPINNER_component));

    if(!DATA_search_array){
      const btnLoadMore = document.createElement("button");
      btnLoadMore.className = "other-films__title_load-more";
      btnLoadMore.innerHTML = `
      <svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 490.922 490.922" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M419.005,72.428C301.22-45.357,161.88,8.52,112.232,40.41L92.157,20.336c-5.725-5.725-14.305-7.434-21.77-4.324 c-7.439,3.08-12.316,10.34-12.307,18.443l0.031,88.262c0,5.502,2.242,10.488,5.85,14.098c3.617,3.617,8.607,5.861,14.102,5.854 l88.225-0.006c8.127,0.02,15.377-4.855,18.455-12.295c3.098-7.498,1.383-16.062-4.326-21.771l-9.877-9.877 c72.988-37.19,154.617-7.344,192.068,30.105c48.74,48.742,60.662,120.547,35.836,180.604l14.455,0.006 c15.963-0.004,30.994,6.221,42.299,17.525c5.957,5.957,10.395,12.984,13.371,20.605 C509.632,257.096,493.304,146.727,419.005,72.428z"></path> <path d="M412.88,349.307l-88.242-0.025c-8.109-0.02-15.375,4.869-18.457,12.303c-3.096,7.465-1.396,16.041,4.326,21.764 l9.877,9.877c-13.186,6.74-111.818,50.156-192.074-30.1c-48.736-48.736-60.65-120.523-35.84-180.582l-14.404-0.008 c-15.943,0.027-30.973-6.188-42.305-17.52c-5.969-5.969-10.422-13.024-13.395-20.678C-18.72,234.807-2.38,345.211,71.921,419.512 c55.902,55.902,132.193,78.625,205.127,69.426c50.215-6.332,89.965-29.609,101.781-37.268l19.938,19.938 c5.709,5.709,14.275,7.422,21.77,4.332c7.441-3.072,12.32-10.336,12.307-18.451V369.27c0.004-5.514-2.232-10.496-5.846-14.109 C423.38,351.543,418.394,349.303,412.88,349.307z"></path> </g> </g></svg> Загрузить ещe
      `;
      btnLoadMore.addEventListener("click", () => {
        SPINNER_component.renderSpinner(btnLoadMore)
        this.loadMoreContent(SPINNER_component);
      });
      container.append(btnLoadMore);
    }
    
    section.append(container);
    document.querySelector(this.ROOT_element).append(section);
    HEADER_component.scrollHeaderOnPage();

  }
  async renderHeadSlider(filmTrend, SPINNER_element) {
    const { media_type, id } = filmTrend;
    const videoPreview = await API_component.getVideoPreview(media_type, id);

    const section = document.createElement("section");
    section.className = "film-week";
    section.innerHTML = `
        <div class="container film-week__container" data-rating="${filmTrend.vote_average.toFixed(
          1
        )}">
        <div class="film-week__poster-wrapper">
            <img class="film-week__poster" src="https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${
              filmTrend.backdrop_path
            }" alt="постер ${filmTrend.original_name || filmTrend.original_title}">
            <p class="film-week__title_origin">${filmTrend.original_name || filmTrend.original_title}</p>
        </div>
        <h2 class="film-week__title">${filmTrend.name || filmTrend.title}</h2>
        <a class="film-week__watch-trailer tube" target="_blank" href="https://youtu.be/${
          videoPreview.results[0] ? videoPreview.results[0].key : ''
        }" aria-label="смотреть трейлер"></a>
        </div>`;
      if(SPINNER_element){
        SPINNER_element.removeSpinner()
      }
    return section;
  }
  renderTitle(text) {
    let textToVisible = text;
    return () => {
      const h2 = document.createElement("h2");
      h2.className = "other-films__title";
      h2.setAttribute("data-active-films", "");
      h2.setAttribute("data-type", "");
      h2.innerHTML = `${textToVisible}
                <span class="other-films__title-add">на TS Cinema</span>
            `;
      return h2;
    };
  }
  changeTitle(text) {
    this.renderTitle(text);
  }
  renderContentList(data, elemtToAdd, SPINNER_component) {
    const list = document.createElement("ol");

    list.className = "other-films__list";
    Promise.allSettled(
      data.map(async (item) => {
        let videoPreview = null;
        if (item.media_type !== "person") {
          videoPreview = await API_component.getVideoPreview(
            item.media_type ? item.media_type : this.mediaType,
            item.id
          );
        }
        return this.createItem(item, videoPreview);
      })
    ).then((listOfContent) => {
      listOfContent.forEach((el) => {
        if (el.status === "fulfilled") {
          if (elemtToAdd) {
            elemtToAdd.append(el.value);
          } else {
            list.append(el.value);
          }
        }
      });
      SPINNER_component.removeSpinner()
    });
    return elemtToAdd ? elemtToAdd : list;
  }
  async createItem(item, videoPrev = null) {
    let videoPreview = videoPrev;
    const li = document.createElement("li");
    li.className = "other-films__item";
    const link = document.createElement("a");
    link.className = "other-films__link";
    link.setAttribute("target", "_blank");
    link.append(await this.loadImg(item.poster_path || item.profile_path));
    link.setAttribute(
      "data-rating",
      `${item.vote_average ? item.vote_average.toFixed(1) : ""}`
    );
    if (videoPreview && videoPreview !== null && videoPreview.results[0]) {
      link.setAttribute(
        "href",
        `https://youtu.be/${videoPreview.results[0].key}`
      );
    }
    li.append(link);
    return li;
  }
  loadImg(poster) {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.className = "other-films__img";
      img.setAttribute("alt", "постер");
      img.src = poster
        ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${poster}`
        : "img/noposter.jpg";
      img.addEventListener("load", () => {
        resolve(img);
      });
    });
  }
  async loadMoreContent(SPINNER_component) {
    this.page_number += 1;
    let data = null;
    if (this.contentType === "trends") {
      data = await API_component.getTrending("week", this.page_number);
    } else {
      data = await API_component.getData(
        this.mediaType,
        this.contentType,
        this.page_number
      );
    }

    this.renderContentList(
      data.results,
      document.querySelector(".other-films__list"),
      SPINNER_component
    );
  }
  set page_number(number) {
    this.page_number = number;
  }
}

const MAIN_PAGE_component = new Main_Page("main");
export { MAIN_PAGE_component };
