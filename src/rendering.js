import axios from "axios";
const refreshAllFilms = ()=>{
    let container = document.getElementById('all-films');
    container.innerHTML=""
        
    axios.get('/api/films')
    .then(results => {
        results.data.forEach(film => {
            container.innerHTML += `<li>
                <h3>${film.title}<h3>
                <h4>Summary:</h4>
                <p>${film.summary}</p>
            </li>`;
        });
    })
    .catch(error=>console.log(error))
    // container.innerHTML = "testing refreshAllFilms";
}
const refreshFeaturedFilm = ()=>{
    let container = document.getElementById('featured-film');
    axios.get('/api/films')
    .then(results => {
        populateFeaturedFilm(container, results.data);
        setInterval(populateFeaturedFilm, 3000, container, results.data);
    })
    .catch(error=>console.log(error))
    
    // container.innerHTML = "testing refreshFeaturedFilm";
}

const populateFeaturedFilm = (container, data) => {
    let idx = Math.floor(Math.random() * data.length);
    container.innerHTML="";
    container.innerHTML += `<h1>Featured Film: ${data[idx].title}</h1>
        <p>${data[idx].summary}</p>`;
}
export {refreshAllFilms, refreshFeaturedFilm};