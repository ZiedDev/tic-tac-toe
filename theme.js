const toggleSwitch = document.getElementById("theme-switch");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");

const currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : "light";

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (currentTheme === "dark") {
        toggleSwitch.checked = true;
        moonIcon.classList.toggle("hide");
    } else {
        sunIcon.classList.toggle("hide");
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        sunIcon.classList.toggle("hide");
        moonIcon.classList.toggle("hide");
    }
    else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        sunIcon.classList.toggle("hide");
        moonIcon.classList.toggle("hide");
    }
}

toggleSwitch.addEventListener("change", switchTheme, false);