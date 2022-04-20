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
  };

  getMovies = () => {
    const callAPI = new MovieDbService();
    callAPI
      .getMovies(this.state.searchQuery, this.state.page)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ movies: res.results });
      });
  };

  render() {
    return (
      <div className="container">
        <CardList data={this.state.movies} />
      </div>
    );
  }
}
