import React, { useEffect, useState } from "react";
import "./style.css";
import Client from "./utils/Client.js";
import View from "./View";

export default function App() {
  const [movieList, setMovieList] = useState([]);
  const [search, setSearch] = useState();
  const client = new Client();

  function onEnter(e) {
    // add moviE
    if (search)
      try {
        client.getMovieData(e.target.value.toLowerCase()).then((data) => {
          if (data && !(data.Response === "False")) {
            if (movieList.findIndex((movie) => movie.Title == data.Title) < 0) {
              setMovieList((prev) => [data, ...prev]);
            } else alert("You have already added this movie.");
          } else
            alert(
              `${JSON.stringify(
                data.Error
              )}\nSorry, ${search} movie was not found!`
            );
          setSearch("");
        });
      } catch (error) {
        alert(`Error adding movie: ${error}`);
      }
  }

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
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            e.key === "Enter" ? onEnter(e) : "";
          }}
        />

        <section className="buttons">
          <button className="btn-reset" onClick={() => setMovieList([])}>
            Reset
          </button>
        </section>
        <section className="movies">
          {movieList?.map((data, idx) => (
            <View key={idx} data={data} />
          ))}
        </section>
      </main>
    </div>
  );
}
