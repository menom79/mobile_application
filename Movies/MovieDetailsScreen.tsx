import React from 'react';
import {StyleSheet, Image, Text, View, ScrollView} from 'react-native';

function MovieDetailsScreen(props): JSX.Element {
  let {
    route: {
      params: {movie},
    },
  } = props;

  let imageURL = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <ScrollView style={styles.body}>
      <Image source={{uri: imageURL}} style={styles.banner} />
      <View style={styles.movieDetails}>
        <Text style={styles.titleText}>{movie.title}</Text>
        <Text style={styles.movieReleaseDate}>
          Release Date: {movie.release_date}
        </Text>
        <Text style={styles.movieReleaseDate}>
          Language: {movie.original_language.toUpperCase()}
        </Text>
        <Text style={styles.movieReleaseDate}>
          Rating: {movie.vote_average}
        </Text>
        <Text style={[styles.movieReleaseDate, {marginBottom: 8}]}>
          Popularity: {movie.popularity}
        </Text>
        <Text style={styles.movieItemText}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  banner: {
    aspectRatio: 2 / 3,
  },
  body: {
    flex: 1,
    backgroundColor: 'black',
  },
  movieDetails: {
    padding: 5,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 8,
  },
  movieReleaseDate: {
    color: '#bbbbbb',
    fontStyle: 'italic',
    fontSize: 12,
    fontWeight: '500',
    paddingBottom: 2,
  },
  movieItemText: {
    color: '#888888',
    fontSize: 14,
  },
});

export default MovieDetailsScreen;
