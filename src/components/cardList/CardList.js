import React from 'react';
import { Spin, Alert } from 'antd';

import 'antd/dist/antd.css';
import MovieCard from '../movieCard/MovieCard';
import './CardList.css';

function CardList({ data, loading, error, errorMsg }) {
  const listItems = data.map((movie) => {
    const { id } = movie;
    return <MovieCard key={id} data={movie} />;
  });
  if (error) {
    return <Alert message="Error" description={errorMsg} type="error" showIcon />;
  }
  return <div className="card-list">{loading ? <Spin size="large" /> : listItems}</div>;
}
export default CardList;
