import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MovieListScreen from './MovieListScreen';
import MovieDetailsScreen from './MovieDetailsScreen';
import MovieVideoScreen from './MovieVideoScreen';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MovieList"
          component={MovieListScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{
            title: 'Movie Details',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: 'black'},
          }}
        />
        <Stack.Screen
          name="MovieVideo"
          component={MovieVideoScreen}
          options={{
            title: 'Movie Video',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: 'black'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
