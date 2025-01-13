import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Random } from './Random';
import { Categories } from './Categories';
import { ListAnime } from './ListAnime';

export function Main({ listAnime, search }) {
  const { category } = useParams(); 
  const [filteredAnime, setFilteredAnime] = useState([]);

  useEffect(() => {
    console.log("Current category:", category);  
    console.log("Current search term:", search);
    let filtered = listAnime;

    if (category) {
      filtered = filtered.filter((anime) => 
        anime.genres.some(genre => genre.name.toLowerCase() === category.toLowerCase())
      );
    }

    if (search) {
      filtered = filtered.filter((anime) => 
        anime.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    console.log("Filtered anime:", filtered);
    setFilteredAnime(filtered);
  }, [category, search, listAnime]); 

  return (
    <>
      <Categories />
      <Random />
      <ListAnime listAnime={filteredAnime} />
    </>
  );
}

