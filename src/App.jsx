import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './style.css';
import {Random} from './components/Random';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Anime } from './components/Anime';




export default function App() {
  const [search, setSearch] = useState('');
  const [listAnime, setListAnime] = useState([]);

  const API_URL = "https://api.jikan.moe/v4/anime";
  
  //const [filteredAnime] = useState([]);

  const changeSearch = (value) => {
    console.log("set Searching:"+ value);
    setSearch(value);
  };

  useEffect(() => {

    
    console.log("se hizo la busqueda:"+ search);
    const fetchData = async () => {
      try {
        const url = search
          ? `${API_URL}?q=${encodeURIComponent(search)}`
          : 'https://api.jikan.moe/v4/anime';
          const response = await fetch(url);
        
       
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json(); 

        
        if (result && result.data) {
          setListAnime(result.data); 
          console.log(result.data);
        } else {
          setListAnime([]); 
        } 
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
      fetchData({});
   
    
  }, [search]);

 /* useEffect(() => {
    if (search.trim() === '') {
      setFilteredAnime(listAnime); // Mostrar todo si no hay búsqueda
    } else {
      const filtered = listAnime.filter((anime) =>
        anime.title.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredAnime(filtered);
    }
  }, [search, listAnime]);
*/                
  return (
    <>
    <Header changeSearch={changeSearch} />
    <Routes>
      <Route index path="/" element={<Main listAnime={listAnime} search={search} />} />
      <Route path="/anime/:mal_id" element={<Anime />} />
      <Route path="/search" element={<Main listAnime={listAnime} search={search} />} />
      <Route path="/category/:category" element={<Main listAnime={listAnime} search={search} />} />
    </Routes>
  </>
);
}
