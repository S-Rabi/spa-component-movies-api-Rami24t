"use strict";
import View from "./View.js";
import Client from "./Client.js";

// Coded by Rami Al-Saadi in Oct 2022:
const view = new View();
const client = new Client();
// initialize movie list
const list = [];
if (localStorage.getItem("list")) {
    const savedList = JSON.parse(localStorage.getItem("list"));
    list.push(...savedList);
    for (const movie of list) {
        client
            .getMovieData(movie)
            .then((data) => {
                if (!(data.Response === "False")) view.displayMovieOnPage(data);
            })
            .catch(error => alert("Error loading a movie: ", error));
    }
}
document.querySelector(".buttons").addEventListener("click", (e) => {
    // save
    if (e.target.classList.contains("btn-save")) {
        localStorage.setItem("list", JSON.stringify(list));
    }
    // reset
    else if (e.target.classList.contains("btn-reset")) {
        list.length = 0;
        localStorage.removeItem("list");
        view.removeDisplay();
    }
});
const input = document.querySelector("#input");
input.addEventListener("keypress", (e) => {
    // add movie
    if (e.key === "Enter") {
        let movie = input.value.toLowerCase();
        if (movie)
            try {
                client.getMovieData(movie).then((data) => {
                    if (data && !(data.Response === "False")) {
                        if (!list.includes(data.Title)) {
                            list.push(data.Title);
                            console.log(typeof data.Response);
                            view.displayMovieOnPage(data);
                        } else alert("You have already added this movie.");
                    } else
                        alert(
                            `${JSON.stringify(data.Error)}\nSorry, ${movie} movie was not found!`
                        );
                    input.value = "";
                });
            } catch (error) {
                alert(`Error adding movie: ${error}`);
            }
    }
});
