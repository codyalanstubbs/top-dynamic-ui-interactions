//import './drop-down.css';
// import './horizontal-collapsible-more.css';
import './image-slider.css';
import Image1 from './flavor-wheel_linesize-1_300x300-1.png';
import Image2 from './flavor-wheel_linesize-1_300x300-2.png';
import Image3 from './flavor-wheel_linesize-1_300x300-3.png';

function buildMenu(itemsArray, parentElement, menuText) {
    const menuID = document.querySelectorAll(".menu").length + 1;
    const menuDiv = createMenuDiv(menuID);

    menuDiv.appendChild(createMenuButton(menuID));

    itemsArray.forEach((item, itemIndex) => {
        const itemDiv = createItemDiv(item, menuID);
        menuDiv.appendChild(itemDiv);
    })

    parentElement.appendChild(menuDiv);

    return menuID;
}

function createMenuDiv(menuID) {
    const menuDiv = document.createElement("ul");
    menuDiv.id = menuID;
    menuDiv.classList = "menu";
    return menuDiv;
}

function createMenuButton(menuID, menuText) {
    const menuButton = document.createElement("li");
    menuButton.id = menuID;
    menuButton.classList = "menuButton";
    menuButton.textContent = "Menu";
    return menuButton;
}

function createItemDiv(itemText, menuID) {
    const itemDiv = document.createElement("li");
    itemDiv.id = menuID;
    itemDiv.classList = "menuItem hidden";
    itemDiv.textContent = itemText;
    return itemDiv;
}

function addOpenMenuEvent(menuID) {
    const menuButton = document.querySelector(`#\\3${menuID}.menuButton`);
    menuButton.addEventListener("click", (e) => {
        const menuID = menuButton.id;
        openMenu(menuID);
    })
}

function openMenu(menuID) {
    const menuItems = document.querySelectorAll(`#\\3${menuID}.menuItem`);
    menuItems.forEach((menuItem) => {
        menuItem.classList.toggle("hidden");
    })

    document.querySelector(`#\\3${menuID}.menuButton`).classList.toggle("straightenBtmEdge");
}


function displayCollapsibleMenu(parentElement) {
    const menuID = buildMenu(["About", "Blog", "Sign Up", "Contact"], parentElement, "Menu");
    addOpenMenuEvent(menuID);
}

//displayCollapsibleMenu(document.body);

function createTabsNav() {
    const tabsNav = document.createElement("nav");
    tabsNav.classList = "tabs";
    return tabsNav;
}

function createMenuList(menuClassList) {
    const menu = document.createElement("ul");
    menu.classList = menuClassList;
    return menu;
}

function createMenuItem(itemClass) {
    const item = document.createElement("li");
    item.classList = itemClass;
    return item;
}

function createMenuLink(menuText, menuLink) {
    const link = document.createElement("a");
    link.setAttribute("href", (menuLink ? menuLink : "#"));
    link.textContent = menuText;
    return link;
}

function createMoreButton() {
    const more = document.createElement("button");
    more.setAttribute("aria-haspopup", "true");
    more.setAttribute("aria-expanded", "false");
    more.classList = "menuButton";
    more.innerHTML = "More &#8595;";
    return more;
}

function buildHorizontalMenu(itemsObject) {
    const tabsNav = createTabsNav();
    const menuList = createMenuList("menu horizontal");
    const moreItem = createMenuItem("more");
    const moreBtn = createMoreButton();
    const secondaryList = createMenuList("secondary");

    itemsObject.forEach((item) => {
        // create visible horizontal menu items
        const menuItem = createMenuItem("menuItem");
        const menuLink = createMenuLink(item.text, item.link);
        menuItem.appendChild(menuLink);
        menuList.appendChild(menuItem);
        
        // create hidden vertical menu items
        const hiddenItem = createMenuItem("menuItem hidden");
        const hiddenLink = createMenuLink(item.text, item.link);
        hiddenItem.appendChild(hiddenLink);
        secondaryList.appendChild(hiddenItem);
    })

    moreItem.appendChild(moreBtn);
    moreItem.appendChild(secondaryList);
    menuList.appendChild(moreItem);
    tabsNav.appendChild(menuList);

    document.body.appendChild(tabsNav);
}

function addCollapsibleInteractions() {
    const container = document.querySelector(".tabs");
    const primary = document.querySelector(".menu.horizontal");
    const primaryItems = container.querySelectorAll(".menu.horizontal > li:not(.more)");
    const secondary = container.querySelector(".secondary");
    const secondaryItems = secondary.querySelectorAll("li");
    const allItems = container.querySelectorAll("li");
    const moreLi = primary.querySelector(".more");
    const moreBtn = moreLi.querySelector(".menuButton");
    
    moreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        container.classList.toggle('show-secondary')
        moreBtn.setAttribute('aria-expanded', container.classList.contains('show-secondary'))
    });
    
    function doAdapt() {
         // show all items for making calculations
         allItems.forEach((item) => {
             item.classList.remove("hidden");
         })
         
         // hid items that do not fit in the primary menu
         let stopWidth = moreBtn.offsetWidth;
         let hiddenItems = [];
         const primaryWidth = primary.offsetWidth;
         primaryItems.forEach((item, i) => {
             if (primaryWidth >= stopWidth + item.offsetWidth) {
                 stopWidth += item.offsetWidth;
             } else {
                 item.classList.add("hidden");
                 hiddenItems.push(i);
             }
         }) 
         
         // toggle visibility of more button and items in the more list
         if (!hiddenItems.length) {
             moreLi.classList.add("hidden");
             container.classList.remove("show-secondary");
             moreBtn.setAttribute("aria-expanded", false);
         } else {
             secondaryItems.forEach((item, i) => {
                 if(!hiddenItems.includes(i)) {
                   item.classList.add('hidden');
                 }
             })
         }
    };
    
    doAdapt();
    window.addEventListener("resize", doAdapt);
    
    document.addEventListener('click', (e) => {
        let el = e.target
        while(el) {
          if(el === secondary || el === moreBtn) {
            return;
          }
          el = el.parentNode
        }
        container.classList.remove('show-secondary')
        moreBtn.setAttribute('aria-expanded', false)
    })
}


const itemsObject = [
    {text: "About", link: "#"},
    {text: "About", link: "#"},
    {text: "About", link: "#"},
    {text: "About", link: "#"},
    {text: "About", link: "#"},
    {text: "About", link: "#"},
    {text: "About", link: "#"},
];
// buildHorizontalMenu(itemsObject);
// addCollapsibleInteractions();
// let carouselDiv = document.querySelector(".carousel");
// console.log(carouselDiv);
// console.log("Image1: ", Image1);
const images = [Image1, Image2, Image3];
const carouselDiv = document.createElement("div");
carouselDiv.classList = "carousel";
carouselDiv.style.backgroundImage = `url(${Image1})`;

const arrowsDiv = document.createElement("div");
arrowsDiv.classList = "arrows";

const arrowLeft = document.createElement("div");
arrowLeft.classList = "arrowLeft";
arrowLeft.textContent = "<";

const arrowRight = document.createElement("div");
arrowRight.classList = "arrowRight";
arrowRight.textContent = ">";

const dotsDiv = document.createElement("div");
dotsDiv.classList = "dots";

images.forEach((image, imageIndex) => {
    if (imageIndex === 0) {
        carouselDiv.style.backgroundImage = `url(${image})`;
    }
    const imgDot = document.createElement("div");
    imgDot.classList = "imgDot";
    imgDot.setAttribute("id", imageIndex); 
    dotsDiv.appendChild(imgDot);    
})

arrowsDiv.appendChild(arrowLeft);
arrowsDiv.appendChild(arrowRight);
carouselDiv.appendChild(arrowsDiv);
carouselDiv.appendChild(dotsDiv);
document.body.appendChild(carouselDiv);