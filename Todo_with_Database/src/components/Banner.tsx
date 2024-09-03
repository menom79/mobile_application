import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface BannerProps {
  title: string;
}

const Banner = ({title}: BannerProps) => (
  <View style={styles.banner}>
    <Text style={styles.bannerText}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#61dafb',
    width: '100%',
    padding: 10,
    borderBottomColor: '#20232a',
    borderBottomWidth: 2,
    marginBottom: 10,
  },
  bannerText: {
    color: '#20232a',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Banner;
