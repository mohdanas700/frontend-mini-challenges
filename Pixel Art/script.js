const container = document.querySelector(".container");
let color = document.querySelector(".color");
let sizeEl = document.querySelector(".size");
let resetBtn = document.querySelector(".btn")

let size = sizeEl.value;
let draw = false;


function populate(size){
    container.style.setProperty('--size', size)
    for (let i = 0; i < size * size; i++) {
        const div = document.createElement("div")
        div.classList.add("pixel")

        div.addEventListener("mouseover", () => {
            if(!draw) return
            div.style.backgroundColor = color.value
        });

        div.addEventListener("mousedown", () => {
            div.style.backgroundColor = color.value
        })

        container.appendChild(div)
    }
};

let reset = () => {
    container.innerHTML = " "
    populate(size)
}

// function reset(){
//     container.innerHTML = " "
//     populate(size)
// }

resetBtn.addEventListener("click", reset);

sizeEl.addEventListener("keyup", () => {
    size = sizeEl.value
    reset()
})

window.addEventListener("mousedown", () => {
    draw = true
});
window.addEventListener("mouseup", () => {
    draw = false
});

populate(size)