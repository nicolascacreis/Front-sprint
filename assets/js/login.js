const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");
const sign_in_btn2 = document.querySelector("#sign-in-btn2");
const sign_up_btn2 = document.querySelector("#sign-up-btn2");

// Para telas grandes
sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
    container.classList.remove("sign-in-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.add("sign-in-mode");
    container.classList.remove("sign-up-mode");
});

// Para telas pequenas (menos de 635px)
sign_up_btn2.addEventListener("click", () => {
    container.classList.add("sign-up-mode2");
});

sign_in_btn2.addEventListener("click", () => {
    container.classList.remove("sign-up-mode2");
});
