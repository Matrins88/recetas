import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiSearch } from 'react-icons/hi';

export function ListAnime() {
  const [listAnime, setListAnime] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); 


  const fetchData = async (query) => {
    try {
    
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
      const data = await response.json();

      // Verifica si hay datos
      if (data.data && data.data.length > 0) {
        setListAnime(data.data);
        console.log('Resultados obtenidos:', data.data);
      } else {
        console.log('No se encontraron resultados.');
        setListAnime([]); 
      }
    } catch (error) {
      console.error('Error al obtener la lista de animes:', error);
      setListAnime([]); 
    }
  };

  
  useEffect(() => {
    fetchData(''); 
  }, []);


  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

 
  const handleSearch = () => {
    console.log('Se hizo la búsqueda:', searchQuery);
    fetchData(searchQuery); 
  };

  return (
    <>
      <section className="container-title">
        <h1 className="anime-titulo">Animes</h1>
      </section>

      {/* Input para la búsqueda */}
      <div className="boton">
        <input className='input'
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Buscar anime..."
          
        />
        <button className="button" onClick={handleSearch}> <HiSearch />
        Buscar</button>



      </div>

      {/* Mostrar los animes */}
      <div className="anime-container">
        {listAnime.length > 0 ? (
          listAnime.map((anime) => (
            <Link key={anime.mal_id} className="anime-card" to={`/anime/${anime.mal_id}`}>
              <h2>{anime.title}</h2>
              <img src={anime.images.jpg.image_url} alt={anime.title} />
            </Link>
          ))
        ) : (
          <p>No se encontraron resultados</p> // Mensaje si no hay resultados
        )}
      </div>
    </>
  );
}
