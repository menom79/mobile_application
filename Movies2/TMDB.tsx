import axios from 'axios';

export interface MovieType {
  id: number;
  adult: boolean;
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
  original_language: string;
  popularity: number;
  vote_count: number;
  vote_average: number;
  video: boolean;
}
export interface MovieVideoType {
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  official: boolean;
  published_at: string;
  type: string;
}

export const BASE_URL = 'https://api.themoviedb.org/3';
export const API_KEY = 'a6af289a5c361e87c895a3dcc7fc8016';

export function getPosterURL(movie: MovieType): string {
  return `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
}

export async function getNowPlayingMovies(): Promise<MovieType[]> {
  let url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&append_to_response=videos`;
  let movies = axios.get(url).then(response => {
    // check console - a movie data should be visible there
    return response.data.results;
  });
  return movies;
}

export async function getMovieVideos(
  movie: MovieType,
): Promise<MovieVideoType[]> {
  let movieVideos: MovieVideoType[] = [];

  let url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}`;

  movieVideos = (await axios.get(url)).data.results
  
  return movieVideos;
}
