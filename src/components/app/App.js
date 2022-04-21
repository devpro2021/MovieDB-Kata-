/* eslint-disable import/order */
import React, { Component } from 'react';

import CardList from '../cardList/CardList';
import Search from '../search/Search';
import MovieDbService from '../../services/MovieDBService';
import { Spin, Alert, Pagination, Empty } from 'antd';
import 'antd/dist/antd.css';
import { format, parseISO } from 'date-fns';
import './App.css';

import noPoster from './noPoster.jpg';

export default class App extends Component {
  state = {
    movies: [],
    searchQuery: 'return',
    page: 1,
    loading: true,
    isError: false,
    errorMsg: '',
    totalPages: 0,
    notFound: false,
  };
  componentDidMount() {
    this.getMovies();
  }

  onError = (err) => {
    this.setState({ isError: true, loading: false, errorMsg: err.message, notFound: false });
  };

  getMovies = () => {
    const { searchQuery, page } = this.state;
    const callAPI = new MovieDbService();
    this.setState({ movies: [], loading: true, isError: false, notFound: false });
    if (searchQuery === '') {
      return;
    }
    callAPI
      .getMovies(searchQuery, page)
      .then((item) => {
        this.setState({
          totalPages: item.total_pages,
          page,
        });
        if (item.results.length === 0) {
          this.setState({ loading: false, notFound: true });
        }
        item.results.forEach((item) => {
          this.createListMovies(item);
        });
      })
      .catch(this.onError);
  };

  createListMovies = (movie) => {
    const newMovie = this.createMovie(movie);
    this.setState(({ movies }) => {
      const newDataMovies = [...movies, newMovie];
      return {
        movies: newDataMovies,
        loading: false,
      };
    });
  };

  createMovie = (movie) => {
    const title = movie.title || 'No movie title';
    const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `${noPoster}`;
    const overview = movie.overview || 'Description not found';
    const release_date = movie.release_date ? format(parseISO(movie.release_date), 'MMMM dd, yyyy') : 'no release date';
    return {
      id: movie.id,
      title,
      overview,
      release_date,
      poster,
    };
  };
  changePage = (page) => {
    this.setState({ page }, () => this.getMovies());
  };
  onSearchChange = (query) => {
    this.setState({ searchQuery: query.trim() }, () => this.getMovies());
  };

  render() {
    const { movies, loading, isError, errorMsg, searchQuery, totalPages, page, notFound } = this.state;
    const preloader = loading ? <Spin size="large" /> : null;
    const error = isError ? <Alert message="Error" description={errorMsg} type="error" showIcon /> : null;
    const filmFound = notFound ? (
      <Empty
        description="Films Not Found"
        image="https://avatars.mds.yandex.net/get-zen_doc/225901/pub_5cbab852953d9400b3f9e162_5cbae75772ca0a00b26c8a5c/scale_1200"
      />
    ) : (
      <CardList data={movies} />
    );
    const pagination =
      totalPages > 0 && !loading ? (
        <Pagination
          defaultCurrent={1}
          current={page}
          total={totalPages * 10}
          showSizeChanger={false}
          onChange={this.changePage}
        />
      ) : null;
    return (
      <div className="container">
        <Search searchQuery={searchQuery} onSearchChange={this.onSearchChange} />
        {preloader}
        {error}
        {filmFound}
        {pagination}
      </div>
    );
  }
}
