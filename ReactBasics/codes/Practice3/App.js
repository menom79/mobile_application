import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const Movie = (props) => {
  const { title, theatre, startTime } = props;

  return (
    <View style={styles.movie}>
      <Text style={styles.movieTitle}>{title}</Text>
      <Text style={styles.movieInfo}>Theatre: {theatre}</Text>
      <Text style={styles.movieInfo}>Starting Time: {startTime}</Text>
    </View>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Movie title="Inception" theatre="Cinema City" startTime="18:00" />
      <Movie title="The Shawshank Redemption" theatre="AMC Theatres" startTime="20:30" />
      <Movie title="The Dark Knight" theatre="Regal Cinemas" startTime="21:15" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  movie: {
    backgroundColor: '#ffffff',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    elevation: 3,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  movieInfo: {
    fontSize: 16,
    marginTop: 8,
  },
});
