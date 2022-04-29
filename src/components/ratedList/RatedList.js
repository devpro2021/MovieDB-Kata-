import React from 'react';

import MovieCard from '../movieCard/MovieCard';
import '../cardList/CardList.css';

function RatedList({ data, createRatedList, rateList }) {
  const listItems = data.map((movie) => {
    const { id } = movie;
    return <MovieCard key={id} data={movie} createRatedList={createRatedList} rateList={rateList} />;
  });
  return <div className="card-list">{listItems}</div>;
}
export default RatedList;
