import { MAIN_PAGE_component } from "./mainPage.js";
class Menu {
  ROOT_element;
  MENU_elementClass;
  constructor(root) {
    this.ROOT_element = root;
  }
  renderMenu() {
    const menu = document.createElement("nav");
    menu.className = "navigation";
    this.MENU_elementClass = ".navigation";
    menu.innerHTML = `
            <ul class="navigation__list get-nav">
            <li class="navigation__item">
                <a href="#" class="navigation__link get-nav__link get-nav__link_triends">В тренде</a>
            </li>

            <li class="navigation__item">
                <a href="#" class="navigation__link get-nav__link get-nav__link_popular-movies">Популярные Фильмы</a>
            </li>

            <li class="navigation__item">
                <a href="#" class="navigation__link get-nav__link get-nav__link_popular-tv">Популярные сериалы</a>
            </li>

            <li class="navigation__item">
                <a href="#" class="navigation__link get-nav__link get-nav__link_top-movies">Top Фильмов</a>
            </li>

            <li class="navigation__item">
                <a href="#" class="navigation__link get-nav__link get-nav__link_top-tv">Top Сериалы</a>
            </li>
        </ul>
        <button class="navigation__close">
            <svg class="navigation__close-cross" height="30" viewBox="0 0 365.696 365.696" width="30" xmlns="http://www.w3.org/2000/svg">
                <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0"></path>
            </svg>
        </button>
        `;
    document.querySelector(this.ROOT_element).append(menu);
    this.addListener(menu);
  }
  addListener(HTMLelement) {
    HTMLelement.addEventListener("click", () => {
      event.preventDefault();
      if (
        event.target.tagName !== "A" &&
        !event.target.closest(".navigation__close")
      ) {
        return;
      }
      MAIN_PAGE_component.page_number = 1;
      if (event.target.closest(".navigation__close")) {
        this.closeMenu();
      }
      if (event.target.classList.contains("get-nav__link_triends")) {
        this.closeMenu();
        MAIN_PAGE_component.renderMainPage("trends");
      }
      if (event.target.classList.contains("get-nav__link_popular-movies")) {
        this.closeMenu();
        MAIN_PAGE_component.renderMainPage("popular-movie");
      }
      if (event.target.classList.contains("get-nav__link_popular-tv")) {
        this.closeMenu();
        MAIN_PAGE_component.renderMainPage("popular-tv");
      }
      if (event.target.classList.contains("get-nav__link_top-movies")) {
        this.closeMenu();
        MAIN_PAGE_component.renderMainPage("top-movie");
      }
      if (event.target.classList.contains("get-nav__link_top-tv")) {
        this.closeMenu();
        MAIN_PAGE_component.renderMainPage("top-tv");
      }

      window.scroll(0, 0);
    });
  }
  openMenu() {
    document
      .querySelector(this.MENU_elementClass)
      .classList.add("navigation_active");
  }
  closeMenu() {
    if (document.querySelector(this.MENU_elementClass)) {
      document
        .querySelector(this.MENU_elementClass)
        .classList.remove("navigation_active");
    }
  }
}

const MENU_component = new Menu("body");
export { MENU_component };

class Footer extends Menu {}
const FOOTER_component = new Footer();
export { FOOTER_component };
