class MovieDbService {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '0d8bb158a5d261923028879ab5e40e61';
  token = JSON.parse(localStorage.getItem('guest_session_id'));

  getDatafromServer = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      return res.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Возникла ошибка с fetch запросом', error);
      return error.message;
    }
  };
  // гостевая сессия
  createGuestSession = async () => {
    const url = `${this.baseUrl}authentication/guest_session/new?api_key=${this.apiKey}`;
    const data = await this.getDatafromServer(url);
    const sessionID = data.guest_session_id;
    return sessionID;
  };

  // получение списка фильмов
  getMovies = async (searchQuery, page) => {
    const url = `${this.baseUrl}search/movie?api_key=${this.apiKey}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`;
    const res = await this.getDatafromServer(url);
    return res;
  };

  // получение списка жанров
  getGenres = async () => {
    const url = `${this.baseUrl}genre/movie/list?api_key=${this.apiKey}`;
    const res = await this.getDatafromServer(url);
    return res.genres;
  };

  //получение Rated списка фильмов
  getRatedFilms = async () => {
    const url = `${this.baseUrl}guest_session/${this.token}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc`;
    const res = await this.getDatafromServer(url);
    return res;
  };

  //добавление рейтинга
  rateFilm = async (id, rating) => {
    const url = `${this.baseUrl}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${this.token}`;
    const body = {
      value: rating,
    };
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    return await fetch(url, { method: 'POST', headers: headers, body: JSON.stringify(body) }).catch((e) =>
      console.log(e)
    );
  };

  //удалить оценку
  deleteRateFilm = async (id) => {
    const url = `${this.baseUrl}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${this.token}`;
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    return await fetch(url, { method: 'DELETE', headers: headers }).catch((e) => console.log(e));
  };
}

const movieDbService = new MovieDbService();

export default movieDbService;
