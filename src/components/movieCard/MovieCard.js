import React from 'react';
import { Card, Tag } from 'antd';

import 'antd/dist/antd.css';
import './MovieCard.css';

const MovieCard = ({ data }) => {
  const { title, poster, overview, release_date } = data;
  const shortDescr = (str, length) => {
    if (str.length < length) {
      return str;
    } else {
      const shortStr = str.substring(0, length);
      const stopIndex = shortStr.lastIndexOf(' ');
      const dotIndex = shortStr.lastIndexOf('.');
      const res = dotIndex > 0 ? shortStr.substring(0, dotIndex) : shortStr.substring(0, stopIndex);
      return res + '...';
    }
  };
  return (
    <Card className="card">
      <div className="card__img">
        <img src={poster} alt="" />
      </div>
      <div className="card__info info-card">
        <h2 className="card__title">{title}</h2>
        <span className="card__date"> {release_date} </span>
        <div className="card__genres genres">
          <Tag className="genres__item">Action</Tag>
          <Tag className="genres__item">Drama</Tag>
        </div>
        <p className="card__description">{shortDescr(overview, 150)}</p>
      </div>
    </Card>
  );
};
export default MovieCard;
