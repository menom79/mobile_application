import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {getPosterURL, getNowPlayingMovies, MovieType} from './TMDB';

function MovieListItem({movie}: {movie: MovieType}): JSX.Element {
  let imageURL = getPosterURL(movie);

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetails', {movie: movie})}>
      <View style={styles.movieItem}>
        <View style={styles.movieItemImage}>
          <Image source={{uri: imageURL}} style={styles.movieImageDimensions} />
        </View>
        <View style={styles.movieDetails}>
          <Text style={styles.movieItemTitle}>
            {movie.title}{' '}
            <Text style={styles.movieLanguage}>
              {movie.original_language.toUpperCase()}
            </Text>
          </Text>
          <Text style={[styles.movieItemText, styles.movieReleaseDate]}>
            Release Date: {movie.release_date}
          </Text>
          <Text
            numberOfLines={6}
            ellipsizeMode="tail"
            style={styles.movieItemText}>
            {movie.overview}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function MoiveList(): JSX.Element {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function _() {
      setMovies(await getNowPlayingMovies());
      setIsLoading(false);
    })();
  }, []);
  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  return (
    <ScrollView>
      {movies.map((movie, idx) => (
        <MovieListItem movie={movie} key={idx} />
      ))}
    </ScrollView>
  );
}

function MovieListScreen(): JSX.Element {
  return (
    <View style={styles.body}>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Text style={styles.titleText}>Movie List</Text>
        <MoiveList />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'black',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 8,
  },
  movieItem: {
    margin: 5,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#333333',
    borderRadius: 5,
  },
  movieDetails: {
    flexShrink: 1,
  },
  movieLanguage: {fontWeight: '400', color: 'pink'},
  movieItemImage: {
    marginRight: 5,
  },
  movieImageDimensions: {
    width: 100,
    height: 150,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  movieItemTitle: {
    fontWeight: 'bold',
    color: '#bbbbbb',
    paddingVertical: 2,
  },
  movieReleaseDate: {
    color: '#bbbbbb',
    fontStyle: 'italic',
    fontSize: 12,
    fontWeight: '500',
    paddingBottom: 2,
  },
  movieItemText: {
    flexWrap: 'wrap',
    color: '#999999',
  },
});

export default MovieListScreen;
