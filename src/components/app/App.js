/* eslint-disable import/order */
import React, { Component } from 'react';
import { Offline, Online } from 'react-detect-offline';

import { GenresProvider } from '../GenresContext';
import CardList from '../cardList/CardList';
import RatedList from '../ratedList/RatedList';
import Search from '../search/Search';
import movieDbService from '../../services/MovieDBService';
import { Spin, Alert, Pagination, Empty, Tabs } from 'antd';
import 'antd/dist/antd.css';
import { format, parseISO } from 'date-fns';
import './App.css';

import noPoster from './noPoster.jpg';
const { TabPane } = Tabs;
export default class App extends Component {
  state = {
    movies: [],
    genres: [],
    rateList: [],
    searchQuery: 'return',
    page: 1,
    loading: true,
    isError: false,
    errorMsg: '',
    totalPages: 0,
    notFound: false,
    tabPane: '1',
  };
  componentDidMount() {
    movieDbService.getGenres().then((genres) => this.setState({ genres: [...genres] }));

    if (!JSON.parse(localStorage.getItem('guest_session_id'))) {
      movieDbService.createGuestSession().then((guestSessionId) => {
        localStorage.setItem('guest_session_id', JSON.stringify(guestSessionId));
      });
    } else {
      this.createRatedList();
    }

    this.getMovies();
  }

  onError = (err) => {
    this.setState({ isError: true, loading: false, errorMsg: err.message, notFound: false });
  };

  getMovies = () => {
    const { searchQuery, page } = this.state;
    this.setState({ movies: [], loading: true, isError: false, notFound: false });
    if (searchQuery === '') {
      return;
    }
    movieDbService
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
  getFilmGenres = (ids) => {
    const filmGenres = [];
    const { genres } = this.state;
    for (let id of ids) {
      genres.forEach((genre) => {
        if (genre.id === id) {
          filmGenres.push(genre.name);
        }
      });
    }
    return filmGenres;
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
  createRatedList = () => {
    movieDbService.getRatedFilms().then((data) => {
      this.setState({ rateList: [...data.results] });
    });
  };
  createMovie = (movie) => {
    const title = movie.title || 'No movie title';
    const poster_path = movie.poster_path ? movie.poster_path : `${noPoster}`;
    const overview = movie.overview || 'Description not found';
    const release_date = movie.release_date ? format(parseISO(movie.release_date), 'MMMM dd, yyyy') : 'no release date';
    const genre_ids = movie.genre_ids || '';
    const vote_average = movie.vote_average;
    const rating = 0;
    return {
      id: movie.id,
      title,
      overview,
      release_date,
      poster_path,
      genre_ids,
      vote_average,
      rating,
    };
  };
  changePage = (page) => {
    this.setState({ page }, () => this.getMovies());
  };

  changeTab = (key) => {
    if (key === '2') {
      this.setState({ tabPane: key, page: 1 }, () => {
        this.createRatedList();
      });
    } else {
      this.setState({ tabPane: key, page: 1 }, () => {
        this.getMovies();
      });
    }
  };

  onSearchChange = (query) => {
    this.setState({ searchQuery: query.trim() }, () => this.getMovies());
  };

  render() {
    const { movies, loading, isError, errorMsg, searchQuery, totalPages, page, notFound, genres, rateList } =
      this.state;
    const preloader = loading ? <Spin size="large" /> : null;
    const error = isError ? <Alert message="Error" description={errorMsg} type="error" showIcon /> : null;
    const filmFound = notFound ? (
      <Empty
        description="Films Not Found"
        image="https://avatars.mds.yandex.net/get-zen_doc/225901/pub_5cbab852953d9400b3f9e162_5cbae75772ca0a00b26c8a5c/scale_1200"
      />
    ) : (
      <CardList data={movies} createRatedList={this.createRatedList} rateList={this.state.rateList} />
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
      <>
        <Offline>
          <Alert
            message="Error"
            description="you do not have an internet connection. Please connect to Internet"
            type="error"
            showIcon
          />
        </Offline>
        <Online>
          <GenresProvider value={genres}>
            <div className="container">
              <Tabs defaultActiveKey="1" onChange={this.changeTab}>
                <TabPane tab="Search" key="1">
                  <Search searchQuery={searchQuery} onSearchChange={this.onSearchChange} />
                  {preloader}
                  {error}
                  {filmFound}
                  {pagination}
                </TabPane>
                <TabPane tab="Rated" key="2">
                  <RatedList data={rateList} />
                </TabPane>
              </Tabs>
            </div>
          </GenresProvider>
        </Online>
      </>
    );
  }
}
