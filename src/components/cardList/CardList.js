import React from 'react';
import { Spin } from 'antd';

import 'antd/dist/antd.css';
import MovieCard from '../movieCard/MovieCard';
import './CardList.css';

function CardList({ data, loading }) {
  const listItems = data.map((movie) => {
    const { id } = movie;
    return <MovieCard key={id} data={movie} />;
  });

  return <div className="card-list">{loading ? <Spin size="large" /> : listItems}</div>;
}
export default CardList;
