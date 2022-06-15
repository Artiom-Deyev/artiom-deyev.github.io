const subLabel = document.querySelector("#sub-label");
const options = document.querySelectorAll(".sub-options");
const innerLi = document.querySelectorAll("#inner")
const inputSub = document.querySelector(".subscription-type");
const inputSubInit = document.querySelector("#subscription-type-initial")
const initialSubs = document.querySelector("#buyblock-initial__subs");
const navPrice = document.querySelector("#nav-price-span")
let menuIsActive = false;


//Set the subscription plan to the form get parameter

function setSubParam(e) {
    let target = e.target;
    subLabel.textContent = target.textContent;
    
    initialSubs.textContent = target.textContent;
    inputSub.value = target.textContent;
    inputSubInit.value = target.textContent;
    
    let currentCurrency = target.textContent.substr(-6);
    
    if(currentCurrency !== "1 year") {
        navPrice.textContent = currentCurrency;
    }
}

innerLi.forEach(el => el.addEventListener("click", (e) => setSubParam(e)))


//Show and hide subscription plan dropdown menu

function toggleMenu() {
    options.forEach(el => {
        el.classList.toggle("show");
        el.classList.toggle("hide");
    });
}

subLabel.addEventListener("click", () => {
    toggleMenu();
    menuIsActive = !menuIsActive;
});

document.addEventListener("click", (e) => {
    let target = e.target;

    if (target !== options && target !== subLabel && menuIsActive) {
        toggleMenu();
        menuIsActive = !menuIsActive;
    }
})


//Screen resize
const navMain = document.querySelector("#dropdown-menu");
const initial = document.querySelector("#buyblock-initial");
let isWindowNarrow = true;

document.addEventListener("DOMContentLoaded", () => {
    let navWidth = document.documentElement.clientWidth;
    
    if (navWidth < 420) {
        isWindowNarrow = false;
        navMain.classList.add("hide");
    } else {
        initial.classList.add("hide");
    }
})

window.addEventListener("resize", () => {
    let navWidth = document.documentElement.clientWidth;
    
    if (navWidth < 420 && isWindowNarrow) {
        navMain.classList.add("hide");
        initial.classList.remove("hide");
    } else if (navWidth > 420) {
        navMain.classList.remove("hide");
        initial.classList.add("hide");
    }
})


//Add listener to switch the buyblock

initialSubs.addEventListener("click", () => {
    navMain.classList.remove("hide");
    initial.classList.add("hide");
    isWindowNarrow = false;
})


//Sticky behaviour
const navContainer = document.querySelector("#nav-container")
const header = document.querySelector("header");
const miniContainer = document.querySelector("#buyblock-initial-container");

const moveMenu = (e) => {
    if(!e[0].isIntersecting) {
        navMain.classList.add("floating");
        miniContainer.classList.add("floating-initial");
    }
    if(e[0].isIntersecting) {
        navMain.classList.remove("floating");
        miniContainer.classList.remove("floating-initial");
    }
}

const moveMenuIntersectingObs = new IntersectionObserver(moveMenu);

moveMenuIntersectingObs.observe(header);


//Changing currency
const currency = document.querySelector("#currency");

currency.addEventListener("change", (e) => {
    let value = e.target.value;
    if (value == "gbp") {
        let text = navPrice.textContent;
        let newText = text.replace("$", "£");
        navPrice.textContent = newText;

        let textLabel = navPrice.textContent;
        let newTextLabel = textLabel.replace("$", "£");
        navPrice.textContent = newTextLabel;

        options.forEach(el => {
            let text = el.textContent;
            let newText = text.replace("$", "£");
            el.textContent = newText;
            console.log(el.textContent)            
        })
        console.log(subLabel.textContent);
    } else if (value == "euro") {
        let text = navPrice.textContent;
        let newText = text.replace("£", "$");
        navPrice.textContent = newText;

        let textLabel = navPrice.textContent;
        let newTextLabel = textLabel.replace("£", "$");
        navPrice.textContent = newTextLabel;       
        navPrice.textContent.replace("£", "$");

        options.forEach(el => {
            let text = el.textContent;
            let newText = text.replace("£", "$");
            el.textContent = newText;
            console.log(el.textContent)
        })
    }
});
