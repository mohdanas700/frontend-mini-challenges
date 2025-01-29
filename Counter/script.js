
let subButton = document.querySelector(".b1")
let addButton = document.querySelector(".b2")
let num = document.querySelector(".num")
let ipnum = document.getElementById("ip")
let resetButton = document.getElementById("reset")

resetButton.addEventListener("click",() => {
    num.innerText = 0
})

addButton.addEventListener("click",() => {
    let text = parseInt(num.innerText)
    num.innerText = text + parseInt(ipnum.value)
})

subButton.addEventListener("click",() => {
    let text = parseInt(num.innerText)
    num.innerText = text - parseInt(ipnum.value) 
})
