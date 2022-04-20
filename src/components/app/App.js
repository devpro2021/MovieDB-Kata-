/* eslint-disable import/order */
import React, { Component } from 'react';
import { Alert } from 'antd';
import CardList from '../cardList/CardList';
import MovieDbService from '../../services/MovieDBService';
import 'antd/dist/antd.css';
import './App.css';

export default class App extends Component {
  state = {
    movies: [],
    searchQuery: 'return',
    page: 1,
    loading: true,
    error: false,
    errorMsg: '',
  };
  componentDidMount() {
    this.getMovies();
  }
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
        {error ? (
          <Alert message="Error" description={errorMsg} type="error" showIcon />
        ) : (
          <CardList data={movies} loading={loading} error={error} errorMsg={errorMsg} />
        )}
      </div>
    );
  }
}
