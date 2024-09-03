import React from 'react';
import {WeatherCard, WeatherInfo} from './WeatherCard';
import {ScrollView, View} from 'react-native';

interface WeatherCardListProps {
  weatherList: WeatherInfo[];
  handleDelete?: () => void;
  handleReload?: () => void;
}

export const WeatherCardList: React.FC<WeatherCardListProps> = ({
  weatherList,
  handleDelete,
  handleReload,
}) => {
  return (
    <ScrollView>
      {weatherList.map((weather: WeatherInfo) => (
        <WeatherCard
          key={weather.id}
          weatherInfo={weather}
          handleDelete={handleDelete}
          handleReload={handleReload}
        />
      ))}
      <View style={{height: 70}}></View>
    </ScrollView>
  );
};
