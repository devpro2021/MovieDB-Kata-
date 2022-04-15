import React from 'react';
import { Card, Tag } from 'antd';

import 'antd/dist/antd.css';
import './MovieCard.css';

const MovieCard = ({ moviesData }) => {
  const posterURL = 'https://image.tmdb.org/t/p/w500/';
  const listItems = moviesData.map((movie) => {
    const { id, poster, description, title, year } = movie;

    function textClipp(text, numberSymbols) {
      if (text.length <= numberSymbols) return text;
      const substr = text.substring(0, numberSymbols - 1);

      return `${substr.substring(0, text.indexOf('.'))}...`;
    }
    let descrClipped;
    if (description) {
      descrClipped = textClipp(description, 180);
    }
    if (!title) return;
    return (
      <Card key={id} className="card">
        <div className="card__img">
          <img src={posterURL + poster} alt="" />
        </div>
        <div className="card__info info-card">
          <h2 className="card__title">{title}</h2>
          <span className="card__date"> {year} </span>
          <div className="card__genres genres">
            <Tag className="genres__item">Action</Tag>
            <Tag className="genres__item">Drama</Tag>
          </div>
          <p className="card__description">{descrClipped}</p>
        </div>
      </Card>
    );
  });
  return listItems;
};
export default MovieCard;
