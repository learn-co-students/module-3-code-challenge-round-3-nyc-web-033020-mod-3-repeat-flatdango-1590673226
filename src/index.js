const url = "http://localhost:3000/films"
const filmsDiv = () => document.querySelector("#films")
const posterDiv = () => document.querySelector("#poster")
const showingDiv = () => document.querySelector("#showing")
const title = document.querySelector(".title")
const runTime = document.getElementById("runtime")
const filmInfo = document.getElementById("film-info")
const showTime = document.getElementById("showtime")
const remainingTickets = document.getElementById("ticket-num")
const divCard = document.getElementsByClassName("card")[0]
const content = document.getElementsByClassName("content")[0]
console.log(content)

document.addEventListener("DOMContentLoaded", () => {
    getFilm()
    handleButton()
})

const getFilm = () => {
    fetch("http://localhost:3000/films/1")
    .then(res => res.json())
    .then(renderMovie)
}

const renderMovie = (movie) => {
    title.innerText = movie.title
    runtime.innerText = `${movie.runtime} minutes`
    filmInfo.innerText = movie.description
    showTime.innerText = movie.showtime
    content.setAttribute(name, movie.tickets_sold)
    remainingTickets.innerText = movie.capacity - movie.tickets_sold
}

const handleButton = () => {
    divCard.addEventListener("click", e => {
        if(e.target.className === "ui orange button"){
            parsedTickets = parseInt(remainingTickets.innerText)
            ticketsLeft = parsedTickets - 1
            remainingTickets.innerText = ticketsLeft

        }
    })
}