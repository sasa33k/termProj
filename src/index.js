import axios from "axios";
import "./style.css";
import {refreshAllFilms, refreshFeaturedFilm} from "./rendering.js";

refreshAllFilms();
refreshFeaturedFilm();

// Event handler for form submission events
const formsubmit = event=>{ 
    event.preventDefault();
    let newFilm = { 
        title:document.getElementById('form-title').value, 
        summary:document.getElementById('form-summary').value
    }
    console.log(newFilm);
    // Figure out how to use Axios to send the above data
    axios.post('/api/films', newFilm, {  headers: {'Content-Type': 'application/json'}})
    .then(results => {
        refreshAllFilms();
        // throw new Error ("xxx");
    })
    .catch(error=>console.log("error",error))
}


let form = document.getElementById('form');
form.addEventListener('submit', formsubmit);