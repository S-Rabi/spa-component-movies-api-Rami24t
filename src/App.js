import React, { useEffect, useState } from "react";
import "./style.css";
import Client from "./utils/Client.js";
import View from "./View";

export default function App() {
  const client = new Client();

  const [movieList, setMovieList] = useState([]);

  const [search, setSearch] = useState('');

  let data;


  function getData(){
    data = client.getMovieData('movi').then((data) => {
      if (!(data.Response === "False"))
        setMovieList([...movieList,data]);
  }).catch(error => alert("Error loading a movie: ", error));

  }


  useEffect(
    ()=>{
      data = client.getMovieData('movi').then((data) => {
        if (!(data.Response === "False"))
          setMovieList([...movieList,data]);
    }).catch(error => alert("Error loading a movie: ", error));

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
    


    document.querySelector(".buttons").addEventListener("click", (e) => {
      // save
      if (e.target.classList.contains("btn-save")) {
          localStorage.setItem("list", JSON.stringify(movieList));
      }
      // reset
      else if (e.target.classList.contains("btn-reset")) {
          setMovieList([]);
          localStorage.removeItem("list");
          // view.removeDisplay();
      }
  });  
}
  ,[])



  return (
    <div>
      <h1>Movie App!</h1>
      <main className="container">
        <h2 className="title">My Movies</h2>
        <input
          type="text"
          className="movie-input"
          id="input"
          placeholder="Add a movie"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
        <section className="movies"></section>
        <section className="buttons">
          <button className="btn-save">Save</button>
          <button className="btn-reset">Reset</button>
        </section>
      </main>
      {
        movieList.map((data,idx)=> <View key={idx} data={data} />)
      }
    </div>
  );
}
