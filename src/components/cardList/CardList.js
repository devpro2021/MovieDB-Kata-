import React from 'react';

import MovieCard from '../movieCard/MovieCard';
import './CardList.css';

function CardList({ data }) {
  const listItems = data.map((movie) => {
    const { id } = movie;
    return <MovieCard key={id} data={movie} />;
  });
  return <div className="card-list">{listItems}</div>;
}

export default CardList;
