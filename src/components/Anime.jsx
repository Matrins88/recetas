import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Categories } from "./Categories";

export function Anime() {
  const { mal_id } = useParams();
  console.log("mal_id:", mal_id); 

  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}`);
        const data = await response.json();
        
       
        if (data.data) {
          setAnime(data.data); 
        }
        console.log("Datos del anime:", data.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    if (mal_id) {
      fetchData();
    }
  }, [mal_id]);

  return (
    <>
      <Categories />
      <div className="anime-link">
        {anime ? (
          <div className="anime-contain">
            <div className="anime-img">
              <img src={anime.images.jpg.large_image_url} alt={anime.title} />
            </div>
            <div className="anime-content">
              <h1>{anime.title}</h1>
              <p>{anime.synopsis}</p>
            </div>
          </div>
        ) : (
          <p>Cargando...</p>
        )}
      </div>
    </>
  );
}
