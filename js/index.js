
import { HEADER_component } from "./header.js";
import { FOOTER_component } from "./burgetMenu.js";
import { MAIN_PAGE_component } from "./mainPage.js";
import { MENU_component } from "./burgetMenu.js";
HEADER_component.renderHeader();

MAIN_PAGE_component.renderMainPage();
MENU_component.renderMenu();
FOOTER_component.addListener(document.querySelector("footer"));
