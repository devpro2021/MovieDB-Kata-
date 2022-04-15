/* eslint-disable import/order */
import React, { Component } from 'react';
import { format } from 'date-fns';

import CardList from '../cardList/CardList';
import MovieDbService from '../../services/MovieDBService';

import './App.css';

import noPoster from '../app/poster_none.png';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.getMovies();
  }

  state = {
    movies: [],
    searchQuery: 'return',
    page: 1,
  };

  getMovies = () => {
    const callAPI = new MovieDbService();
    callAPI
      .getMovies()
      .then((res) => res.json())
      .then(({ results }) =>
        results.forEach((item) => {
          this.createMovieList(item);
        })
      );
  };

  createMovieList = (item) => {
    const newFilm = this.createMovie(item);
    this.setState(({ movies }) => {
      const newDataMovies = [...movies, newFilm];
      return {
        movies: newDataMovies,
      };
    });
  };

  createMovie = ({ id, poster_path, title, overview, release_date }) => {
    return {
      id: id,
      poster: poster_path,
      title: title,
      description: overview,
      year: format(new Date(release_date), 'MMMM d, yyyy'),
    };
  };

  render() {
    return (
      <div className="container">
        <CardList data={this.state.movies} />
      </div>
    );
  }
}
