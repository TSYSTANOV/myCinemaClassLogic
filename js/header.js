import { API_component } from "./api.js";
import { MENU_component } from "./burgetMenu.js";
import { MAIN_PAGE_component } from "./mainPage.js";
class Header {
  ROOT_element;
  constructor(root) {
    this.ROOT_element = root;
  }
  renderHeader() {
    const container = document.createElement("div");
    container.className = "container header__container";

    const form = document.createElement("form");
    form.className = "header__search-form";
    form.innerHTML = `<input class="header__search-input" type="search" name="search" required="" placeholder="Поиск">`;

    const headerLogo = document.createElement("p");
    headerLogo.className = "header__logo";
    headerLogo.innerHTML =
      '<span class="header__logo-primary">TS</span> Cinema';
    headerLogo.addEventListener("click", () => {
      MAIN_PAGE_component.renderMainPage();
    });
    container.prepend(headerLogo);
    container.append(form);

    const headerBtn = document.createElement("button");
    headerBtn.className = "header__burger-btn";
    headerBtn.setAttribute("aria-label", "открыть меню");
    headerBtn.innerHTML = `
        <svg class="header__burger-svg" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.94403 9.8959H34.6564" stroke-width="2.475" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M28.0537 19.8H4.94403" stroke-width="2.475" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M4.94403 29.7041H21.4509" stroke-width="2.475" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>`;
    headerBtn.addEventListener("click", () => {
      this.openMenu();
    });
    container.append(headerBtn);
    document.querySelector(this.ROOT_element).append(container);
    this.addSearchListener(form);
  }
  openMenu() {
    MENU_component.openMenu();
  }
  addSearchListener(form) {
    form.addEventListener("submit", async () => {
      event.preventDefault();
      const result = await API_component.getSearch(form.search.value);
      MAIN_PAGE_component.renderMainPage("search", result, form.search.value);
      form.reset();
      form.search.blur();
      window.scroll(0,0)
    });
  }
  scrollHeaderOnPage() {
    const headerElement = document.querySelector(`.${this.ROOT_element}`);
    const fromTop =
      document.querySelector(".other-films__title").getBoundingClientRect()
        .top +
      document.querySelector(".other-films__title").getBoundingClientRect()
        .height;
    const btnScrollToTop = document.querySelector(".up-top");
    btnScrollToTop.addEventListener("click", () => {
      window.scroll(0,0)
    });

    let scroll = 0;
    window.addEventListener("scroll", () => {
      if (scroll > fromTop) {
        if (window.scrollY > scroll) {
          headerElement.style.top = "0px";
        } else {
          headerElement.style.top = `-${headerElement.scrollHeight}px`;
        }
        btnScrollToTop.classList.add("up-top__active");
      } else {
        headerElement.style.top = "0px";
        btnScrollToTop.classList.remove("up-top__active");
      }
      scroll = window.scrollY;
    });
  }
}

const HEADER_component = new Header("header");
export { HEADER_component };
