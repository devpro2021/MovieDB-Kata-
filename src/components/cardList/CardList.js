import React from 'react';

import MovieCard from '../movieCard/MovieCard';
import './CardList.css';

function CardList({ data }) {
  return (
    <div className="card-list">
      <MovieCard moviesData={data} />
    </div>
  );
}

export default CardList;
