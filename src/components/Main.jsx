import{ Categories} from './Categories';
import {ListAnime} from './ListAnime';

export function Main({ listAnime }) {
    return (
      <>
        {listAnime && listAnime.length > 0 ? (
          listAnime.map((anime) => (
            <div className="Anime-card" key={anime.mal_id}>
              <img src={anime.images.jpg.image_url} alt={anime.title} />
              <h2>{anime.title}</h2>
            </div>
          ))
        ) : (
          <p>No se encontraron animes.</p>
        )}
      </>
    );
  }
