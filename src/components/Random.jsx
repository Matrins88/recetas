import { useState, useEffect } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";

export function Random() {
  const [anime, setAnime] = useState(null);

  const API_URL = "https://api.jikan.moe/v4/random/anime";

  const fetchData = async () => {
    try {
      let validAnime = null;

      // Repetir la solicitud hasta que no sea hentai
      while (!validAnime) {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Verificar si el anime no es hentai
        if (data.data.rating !== "Rx - Hentai") {
          validAnime = data.data; // Solo asignar si no es hentai
        }
      }

      setAnime(validAnime);
    } catch (error) {
      console.error("Error fetching random anime:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="random-container">
      <button className="button-sig" onClick={fetchData}>
        <HiArrowNarrowRight size={24} />
      </button>

      {anime && (
        <article className="anime-main">
          <img
            className="random-img"
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
          />
          <div className="anime-title">
            <h2 className="titulo">{anime.title}</h2>
            <p>{anime.synopsis ? anime.synopsis.substring(0, 100) + "..." : "Sin descripción"}</p>
          </div>
        </article>
      )}
    </div>
  );
}
