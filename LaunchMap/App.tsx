import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Platform,
  Linking,
} from 'react-native';

import openMap from 'react-native-open-maps';

function App(): JSX.Element {
  const [latitude, setLatitude] = useState('62.2513459');
  const [longitude, setLongitude] = useState('25.7330308');
  const [zoom, setZoom] = useState('10');

  const launchMap = () => {
    const location = `${latitude}, ${longitude}`;
    const url = Platform.select({
      ios: `maps:${location}`,
      android: `geo:${location}?center=${location}&q=${location}&z=${zoom}`,
    });
    Linking.openURL(url);
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <Text style={styles.title}>Launch Map</Text>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Latitude</Text>
            <TextInput
              style={styles.inputField}
              value={latitude}
              onChangeText={setLatitude}
              placeholder="Latitude e.g. 62.244217975892056"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Longitude</Text>
            <TextInput
              style={styles.inputField}
              value={longitude}
              onChangeText={setLongitude}
              placeholder="Longitude e.g. 25.746669340878725"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Zoom level</Text>
            <TextInput
              style={styles.inputField}
              value={zoom}
              onChangeText={setZoom}
              placeholder="Zoom e.g. 12"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
            />
          </View>
          <Button title="Open Map at coordinates" onPress={launchMap} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    margin: 20,
  },

  inputContainer: {
    justifyContent: 'center',
    gap: 2,
    marginBottom: 10,
  },
  inputLabel: {
    color: 'black',
    fontSize: 16,
  },
  inputField: {
    color: 'black',
    backgroundColor: '#eee',
    borderColor: '#aaf',
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
});

export default App;
