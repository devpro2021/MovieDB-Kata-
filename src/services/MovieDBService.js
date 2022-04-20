export default class MovieDbService {
  baseUrl = 'https://api.themoviedb.org/3/';
  apiKey = '0d8bb158a5d261923028879ab5e40e61';

  getDatafromServer = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      return res;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Возникла ошибка с fetch запросом', error);
      return error.message;
    }
  };

  getMovies = async (searchQuery, page) => {
    const url = `${this.baseUrl}search/movie?api_key=${this.apiKey}&language=en-US&query=${searchQuery}&page=${page}&include_adult=false`;
    const res = await this.getDatafromServer(url);
    return res;
  };
}
