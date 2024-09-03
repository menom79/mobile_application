import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Button,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {Callout, Marker} from 'react-native-maps';
import {FloatingAction} from 'react-native-floating-action';
import {Dialog} from 'react-native-simple-dialogs';
import Toast from 'react-native-toast-message';

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import IconAntD from 'react-native-vector-icons/AntDesign';

interface City {
  id: number;
  name: string;
  note: string;
  longitude: number;
  latitude: number;
}

const jyvaskylaRegion = {
  latitude: 62.244217975892056,
  latitudeDelta: 0.033882708801989736,
  longitude: 25.746669340878725,
  longitudeDelta: 0.03966551274061203,
};

const mapPos = {
  latitude: 62.244217975892056,
  longitude: 25.746669340878725,
};

const actions = [
  {
    text: 'Add city',
    icon: <IconMaterial name="add-location-alt" size={20} />,
    name: 'add_city',
    position: 1,
  },
  {
    text: 'View cities',
    icon: <IconFA5 name="clipboard-list" size={20} />,
    name: 'view_city',
    position: 2,
  },
];

async function getCoordinates(
  cityName: string,
): Promise<{latitude: number; longitude: number}> {
  let response = await fetch(
    `https://nominatim.openstreetmap.org/search?city=${cityName}&format=json&limit=1`,
  );
  let data = await response.json();
  if (data.length === 0) return null;
  let {lat, lon} = data[0];
  return {latitude: parseFloat(lat), longitude: parseFloat(lon)};
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function App(): JSX.Element {
  const [addCityModalVisible, setAddCityModalVisible] =
    useState<boolean>(false);
  const [viewCitiesModalVisible, setViewCitiesModalVisible] =
    useState<boolean>(false);
  const [newCityName, setNewCityName] = useState<string>('');
  const [newCityNote, setNewCityNote] = useState<string>('');
  const [cities, setCities] = useState<City[]>([]);

  const mapRef = useRef<MapView>(null);

  const addCity = (city: City) => {
    let newCities = [city, ...cities];

    AsyncStorage.setItem('cities', JSON.stringify(newCities));
    setCities(newCities);
    setAddCityModalVisible(false);
  };
  const updateCities = (updatedCities: City[]) => {
    setCities(updatedCities);
    AsyncStorage.setItem('cities', JSON.stringify(updatedCities));
  };
  const removeCity = (cityToRemove: City) => {
    updateCities(cities.filter(city => city.id !== cityToRemove.id));
  };

  useEffect(() => {
    AsyncStorage.getItem('cities').then(cities => {
      if (cities) {
        setCities(JSON.parse(cities));
      }
    });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar />

      <MapView ref={mapRef} style={styles.map} initialRegion={jyvaskylaRegion}>
        {cities.map(city => {
          return (
            <Marker
              key={city.id}
              coordinate={{latitude: city.latitude, longitude: city.longitude}}>
              <Callout>
                <ScrollView style={styles.calloutContainer}>
                  <Text style={styles.cityName}>{city.name}</Text>
                  <Text style={styles.cityNote}>
                    {city.note.trim() !== '' ? city.note : 'Empty note!'}
                  </Text>
                </ScrollView>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <FloatingAction
        floatingIcon={<IconEntypo name="menu" size={35} />}
        actions={actions}
        onPressItem={name => {
          if (name === 'add_city') {
            setAddCityModalVisible(true);
          } else if (name === 'view_city') {
            setViewCitiesModalVisible(true);
          }
        }}
      />

      <Dialog
        visible={addCityModalVisible}
        title="Add City"
        onTouchOutside={() => setAddCityModalVisible(false)}>
        <View style={{zIndex: 20}}>
          <Toast />
        </View>
        <View style={styles.inputFieldsContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>City Name</Text>
            <TextInput
              style={styles.inputField}
              value={newCityName}
              onChangeText={setNewCityName}
              placeholder="Helsinki"
              placeholderTextColor="#aaa"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Note</Text>
            <TextInput
              multiline
              style={styles.inputField}
              value={newCityNote}
              onChangeText={setNewCityNote}
              placeholder="Capital of Finland"
              placeholderTextColor="#aaa"
            />
          </View>
          <View>
            <TouchableOpacity
              style={styles.addLocationButton}
              onPress={async () => {
                let coords = await getCoordinates(newCityName);
                if (!coords) {
                  Toast.show({
                    type: 'error',
                    text1: 'Invalid city name',
                    text2: `No coordinates found using "${newCityName}" city name!`,
                  });
                } else {
                  let {latitude, longitude} = coords;
                  addCity({
                    latitude,
                    longitude,
                    name: newCityName,
                    note: newCityNote,
                    id: Math.random(),
                  });
                  setNewCityName('');
                  setNewCityNote('');
                }
              }}>
              <IconMaterial name="add-location-alt" size={25} />
            </TouchableOpacity>
          </View>
        </View>
      </Dialog>

      {viewCitiesModalVisible && (
        <ScrollView style={styles.citiesListContainer}>
          <View style={styles.viewCitiesHeader}>
            <Text style={styles.placesText}>Your places </Text>
            <TouchableOpacity onPress={() => setViewCitiesModalVisible(false)}>
              <IconAntD name="closecircle" size={35} color="red" />
            </TouchableOpacity>
          </View>

          <View style={{gap: 10}}>
            {cities.map(city => (
              <View key={city.id} style={styles.cityContainer}>
                <Text style={styles.cityName}>{city.name}</Text>
                <Text style={styles.cityNote}>
                  {city.note.trim() !== '' ? city.note : 'Empty note!'}
                </Text>
                <View style={styles.cityActions}>
                  <Button
                    title="Remove"
                    onPress={() => removeCity(city)}
                    color={'red'}
                  />
                  <Button
                    title="Go to marker"
                    onPress={() => {
                      mapRef.current?.animateToRegion({
                        longitude: city.longitude,
                        latitude: city.latitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                      });
                      setViewCitiesModalVisible(false);
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
          <View style={{height: 25}}></View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
  inputFieldsContainer: {
    gap: 10,
  },
  inputContainer: {
    justifyContent: 'center',
    gap: 2,
  },
  inputLabel: {
    color: 'black',
    fontSize: 16,
  },
  inputField: {
    color: 'black',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  addLocationButton: {
    backgroundColor: 'green',
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 'auto',
  },
  citiesListContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'white',
    padding: 15,
  },
  viewCitiesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  placesText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 10,
  },
  cityContainer: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#aaa',
  },
  cityName: {fontSize: 18, fontWeight: 'bold', color: 'black'},
  cityNote: {fontSize: 14, color: 'grey', marginBottom: 5},
  cityActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
  calloutContainer: {
    maxWidth: windowWidth - 50,
    maxHeight: windowHeight - 50,
    height: '90%',
  },
});

export default App;
