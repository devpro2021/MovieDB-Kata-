import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { format, parseISO } from 'date-fns';

import MovieDbService from '../../services/MovieDBService';
import './App.css';
import 'antd/dist/antd.css';

import noPoster from './poster_none.png';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    movies: [],
    searchQuery: 'return',
    page: 1,
  };

  searchMovies = () => {
    const req = new MovieDbService();
    req.getMovies().then((movie) => {
      // movie.results.forEach((movie) => {
      //   this.addItemToList(movie);
      // });
      console.log(movie);
    });
  };

  createItem = (item) => {
    const filmTitle = item.Title;
    const description = item.Plot;
    const releaseDate = item.Released;
    const posterURL = item.Poster ? item.poster : noPoster;
    const genres = item.Genre;
    return {
      id: item.imdbID,
      filmTitle,
      description,
      releaseDate,
      posterURL,
      genres,
    };
  };

  addItemToList = (item) => {
    const newFilm = this.createItem(item);
    this.setState(({ movies }) => {
      const newDataMovies = [...movies, newFilm];
      return {
        movies: newDataMovies,
      };
    });
  };

  render() {
    return (
      <div className="container">
        <Row gutter={36}>
          <Col span={12}>
            {/* <MovieCard /> */}
            <button onClick={this.searchMovies}>Нами</button>
          </Col>
          <Col span={12}>{/* <MovieCard /> */}</Col>
        </Row>
      </div>
    );
  }
}
