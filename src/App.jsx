import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';

const API_URL = "https://api.jikan.moe/v4/anime";

export default function App() {
  const [search, setSearch] = useState('');
  const [listAnime, setListAnime] = useState([]);
  const [filteredAnime, setFilteredAnime] = useState([]);

  const changeSearch = (value) => {
    setSearch(value);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setListAnime(data.data);
        setFilteredAnime(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    
      fetchData();
    
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredAnime(listAnime); // Mostrar todo si no hay búsqueda
    } else {
      const filtered = listAnime.filter((anime) =>
        anime.title.toLowerCase().includes(search.toLowerCase()) // Comparación case-insensitive
      );
      setFilteredAnime(filtered);
    }
  }, [search, listAnime]);

  return (
    <>
      <Header search={search} changeSearch={changeSearch} />
      <Routes>
        <Route index path="/" element={<Main listAnime={filteredAnime} />} />
      </Routes>
    </>
  );
}
