//import './drop-down.css';
import './horizontal-collapsible-more.css';

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

const container = document.querySelector('.tabs')
const primary = container.querySelector(".menu.horizontal");
const primaryItems = container.querySelectorAll(".menu.horizontal > li:not(.more)");
container.classList.add('--jsfied');

primary.insertAdjacentHTML('beforeend', `
    <li class="more">
        <button class="menuButton" aria-haspopup="true" aria-expanded="false">More <span>&darr;</span></button>
        <ul class="secondary">
            ${primary.innerHTML}
        </ul>
    </li>
`)

const secondary = container.querySelector(".secondary");
const secondaryItems = secondary.querySelectorAll("li");
const allItems = container.querySelectorAll("li");
const moreLi = primary.querySelector(".more");
const moreBtn = moreLi.querySelector(".menuButton");

moreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    container.classList.toggle('show-secondary')
    moreBtn.setAttribute('aria-expanded', container.classList.contains('show-secondary'))
})


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
}

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