import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { baseUrl, imageUrl } from "../../Constants/constants";
import axios from "../../axios";
import "./RowPost.css";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState("");

  useEffect(() => {
    axios
      .get(props.url)
      .then((response) => {
        console.log(response);
        const shuffledMovies = shuffleArray(response.data.results);
        setMovies(shuffledMovies);
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    console.log(id);

    const tvSeriesUrl = `${baseUrl}/tv/${id}/videos?language=en-US`;
    const movieUrl = `${baseUrl}/movie/${id}/videos?language=en-US`;

    const tvSeriesOptions = {
      method: "GET",
      url: tvSeriesUrl,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTU3ZGZlOTVmM2ZiNjMzZTkwZmQ2NTM0NWI0OTczMyIsInN1YiI6IjY1MTEyZjY5ZThkMGI0MDEwY2U0MmJjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B9AYvHsRPreTJInavE1p7QXWZI8er8v15R9k3V2E6Q4",
      },
    };

    const movieOptions = {
      method: "GET",
      url: movieUrl,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYTU3ZGZlOTVmM2ZiNjMzZTkwZmQ2NTM0NWI0OTczMyIsInN1YiI6IjY1MTEyZjY5ZThkMGI0MDEwY2U0MmJjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B9AYvHsRPreTJInavE1p7QXWZI8er8v15R9k3V2E6Q4",
      },
    };

    axios
      .request(tvSeriesOptions)
      .then(function (response) {
        console.log(response.data);
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0]);
        } else {
          axios
            .request(movieOptions)
            .then(function (response) {
              console.log(response.data);
              if (response.data.results.length !== 0) {
                setUrlId(response.data.results[0]);
              }
            })
            .catch(function (error) {
              console.error(error);
            });
        }
      })
      .catch(function (error) {
        console.error(error);
        axios
          .request(movieOptions)
          .then(function (response) {
            console.log(response.data);
            if (response.data.results.length !== 0) {
              setUrlId(response.data.results[0]);
            }
          })
          .catch(function (error) {
            console.error(error);
          });
      });
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj) => {
          return (
            <img
              onClick={() => handleMovie(obj.id)}
              className={props.isSmall ? "smallPoster" : "poster"}
              src={`${imageUrl + obj.backdrop_path}`}
              alt="Poster"
            />
          );
        })}
      </div>
      {urlId && <YouTube opts={opts} videoId={urlId.key} />}
    </div>
  );
}

export default RowPost;
