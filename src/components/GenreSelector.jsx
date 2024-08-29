import React from 'react';


const GenreSelector = ({ genres, onSelectGenre }) => {
  return (
    <div style={{ margin: '20px 0' }}>
      <select onChange={(e) => onSelectGenre(e.target.value)} style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreSelector;
