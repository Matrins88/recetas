import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';

export function Header({ search, changeSearch }) {
  const [prevSearch, setPrevSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    changeSearch(prevSearch); 
  };

  return (
    <div className="form-data">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar anime"
          value={prevSearch}
          onChange={(e) => setPrevSearch(e.target.value)} 
        />
        <button type="submit">
          <HiSearch />
          Buscar
        </button>
      </form>
    </div>
  );
}
