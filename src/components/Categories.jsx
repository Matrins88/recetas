import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/genres/anime');
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="list-gener">
      {categories &&
        categories
          .filter(item =>
            ['Action', 'Adventure', 'Comedy', 'Space', 'Shoujo', 'Samurai', 'Psychological', 'Parody', 'Mecha'].includes(item.name)
          )
          .map(item => (
            <Link to={`/category/${item.name.toLowerCase()}`} key={item.mal_id}>
              <div className="gener">{item.name}</div>
            </Link>
          ))}
    </section>
  );
}
