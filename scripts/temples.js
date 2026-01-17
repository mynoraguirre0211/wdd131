const hamButton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");
const navselector = document.querySelectorAll("header");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
    hamButton.classList.toggle("open");
    navselector.classList.toggle("open");
});
