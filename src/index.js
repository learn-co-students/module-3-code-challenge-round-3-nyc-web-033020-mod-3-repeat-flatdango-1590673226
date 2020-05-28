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
const menu = document.getElementsByClassName("film item")[0]
const filmItem = document.getElementsByClassName("film item")[1]
const poster = document.getElementById("poster")
const button = document.getElementsByClassName("ui orange button")[0]




document.addEventListener("DOMContentLoaded", () => {
    getFilm()
    handleButton()
    getAllFilms()
    displayNewMovie()
    displaySoldOutMovies()
})

const getFilm = () => {
    fetch("http://localhost:3000/films/1")
    .then(res => res.json())
    .then(renderMovie)
}

const renderMovie = (movie) => {
    divCard.innerHTMl = ""
    title.innerText = movie.title
    poster.src = movie.poster
    button.dataset.id = movie.id
    runtime.innerText = `${movie.runtime} minutes`
    filmInfo.innerText = movie.description
    showTime.innerText = movie.showtime
    remainingTickets.dataset.num = movie.tickets_sold
    remainingTickets.innerText = movie.capacity - movie.tickets_sold
}

const handleButton = () => {
    divCard.addEventListener("click", e => {
        if(e.target.className === "ui orange button"){
            if(parseInt(remainingTickets.innerText) > 0){
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
            const id = button.dataset.id
          
            fetch(`http://localhost:3000/films/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                },
                body: JSON.stringify({tickets_sold: newTickets})
            })
            .then(res => res.json())
            .then(newMovie)
            }
        }
    })
}

const getAllFilms = () => {
    fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(renderMovies)
}

const renderMovies = (movies) => {
    movies.forEach(movie => {
        const movieName = document.createElement("li")
        movieName.className = "movieName"
        movieName.dataset.id = movie.id
        movieName.innerText = movie.title
        filmItem.appendChild(movieName)
    })
}

const displayNewMovie = () => {
    document.addEventListener("click", e => {
        if(e.target.className === "movieName") {
            id = e.target.dataset.id
           newMovie()
        }
    })
}


const newMovie = () => {
    fetch(`http://localhost:3000/films/${id}`)
    .then(res => res.json())
    .then(renderMovie)
}


displaySoldOutMovies = () => {
    if(remainingTickets.innerText === "0"){
        
    }
}