import React from 'react';
import { Card, Tag, Rate } from 'antd';

import movieDbService from '../../services/MovieDBService';
import { GenresConsumer } from '../GenresContext';
import 'antd/dist/antd.css';
import './MovieCard.css';

const MovieCard = ({ data, rateList, createRatedList }) => {
  const { id, title, poster_path, overview, release_date, genre_ids, vote_average, rating } = data;
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
  const changeRatingColor = (num) => {
    let color;
    if (num < 3) {
      color = '#E90000';
    } else if (num > 3 && num < 5) {
      color = '#E97E00';
    } else if (num > 5 && num < 7) {
      color = '#E9D100';
    } else {
      color = '#66E900';
    }
    return {
      borderColor: color,
    };
  };
  const changeRating = (rate) => {
    const id = data.id;
    console.log(rate);
    if (rate === 0) {
      movieDbService.deleteRateFilm(id);
    } else {
      movieDbService.rateFilm(id, rate);
    }
    createRatedList();
  };
  const checkRating = (id, arr, isRate) => {
    let rating = 0;
    if (isRate) {
      rating = isRate;
    } else {
      arr.forEach((el) => {
        if (el.id === id) {
          rating = el.rating;
          return rating;
        }
      });
    }
    return rating;
  };
  return (
    <GenresConsumer>
      {(genres) => {
        const newGenresList = [];
        for (let ids of genre_ids) {
          genres.forEach(({ id, name }) => {
            if (ids === id) {
              newGenresList.push(name);
            }
          });
        }
        let onRating = checkRating(id, rateList, rating);
        return (
          <Card className="card">
            <div className="card__img">
              <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
            </div>
            <div className="card__info info-card">
              <div style={changeRatingColor(vote_average)} className="card-info__rating">
                {vote_average}
              </div>
              <h2 className="card__title">{title}</h2>
              <span className="card__date"> {release_date} </span>
              <div className="card__genres genres">
                {newGenresList.map((item) => {
                  return (
                    <Tag key={item} className="genres__item">
                      {item}
                    </Tag>
                  );
                })}
              </div>
              <p className="card__description">{shortDescr(overview, 100)}</p>
              <Rate count={10} defaultValue={onRating} onChange={changeRating} />
            </div>
          </Card>
        );
      }}
    </GenresConsumer>
  );
};
export default MovieCard;
