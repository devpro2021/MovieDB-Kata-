/* eslint-disable import/order */
import React, { Component } from 'react';

import CardList from '../cardList/CardList';
import MovieDbService from '../../services/MovieDBService';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.getMovies();
  }

  state = {
    movies: [],
    searchQuery: 'return',
    page: 1,
    loading: true,
    error: false,
    errorMsg: '',
  };
  onError = (err) => {
    this.setState({ error: true, loading: false, errorMsg: err.message });
  };
  getMovies = () => {
    const callAPI = new MovieDbService();
    callAPI
      .getMovies(this.state.searchQuery, this.state.page)
      .then((res) => {
        this.setState({ movies: res.results, loading: false });
      })
      .catch(this.onError);
  };

  render() {
    const { movies, loading, error, errorMsg } = this.state;
    return (
      <div className="container">
        <CardList data={movies} loading={loading} error={error} errorMsg={errorMsg} />
      </div>
    );
  }
}
