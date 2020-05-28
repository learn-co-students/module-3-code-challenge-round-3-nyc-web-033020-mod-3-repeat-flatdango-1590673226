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
    divCard.innerHTMl = ""
    title.innerText = movie.title
    runtime.innerText = `${movie.runtime} minutes`
    filmInfo.innerText = movie.description
    showTime.innerText = movie.showtime
    remainingTickets.dataset.num = movie.tickets_sold
    remainingTickets.innerText = movie.capacity - movie.tickets_sold
}

const handleButton = () => {
    divCard.addEventListener("click", e => {
        if(e.target.className === "ui orange button"){
            if(remainingTickets > 0){
            parsedTickets = parseInt(remainingTickets.innerText)
            ticketsLeft = parsedTickets - 1
            remainingTickets.innerText = ticketsLeft
            const movieCard = e.target.parentElement.parentElement
            const secondChild = (movieCard.children[2])
            const thirdChild = (secondChild.children[0])
            const currentTicketsNode = thirdChild.children[2]
            const currentTicketsNum = currentTicketsNode.dataset.num
            const parsedCurrentTickets = parseInt(currentTicketsNum)
            const newTickets = parsedCurrentTickets + 1
            fetch("http://localhost:3000/films/1", {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify({tickets_sold: newTickets})
            })
            .then(res => res.json())
            .then(getFilm)
        }
    })
}