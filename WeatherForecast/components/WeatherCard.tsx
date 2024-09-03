import React, {FC} from 'react';
import {Text, Image, StyleSheet} from 'react-native';
import {Box, Stack, Button} from 'native-base';
import {Card} from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconM from 'react-native-vector-icons/MaterialIcons';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import IconIsto from 'react-native-vector-icons/Fontisto';
import IconIon from 'react-native-vector-icons/Ionicons';

import {getIconUrl} from '../api';

export interface WeatherInfo {
  savedCityName: string;
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export type WeatherCardProps = {
  weatherInfo: WeatherInfo;
  children?: React.ReactNode;
  handleDelete?: (cityName: string) => void;
  handleReload?: (cityName: string) => void;
};

const leftFillNum = (num: number, targetLength: number) =>
  num.toString().padStart(targetLength, '0');
function secondsToUTCOffset(seconds_to_convert: number) {
  let minutes = Math.floor(Math.floor(seconds_to_convert / 60) % 60);
  let hours = Math.floor((seconds_to_convert / (60 * 60)) % 24);
  return `UTC ${seconds_to_convert < 0 ? '-' : '+'}${leftFillNum(
    hours,
    2,
  )}:${leftFillNum(minutes, 2)}`;
}

export const WeatherCard: FC<WeatherCardProps> = (props): JSX.Element => {
  let weather = props.weatherInfo;
  let dt = new Date(weather.dt * 1000);

  return (
    <Card containerStyle={{borderRadius: 10}}>
      <Box style={{gap: 4}}>
        <Box style={styles.topBox}>
          <Box style={styles.topItem}>
            <Icon name="map-marker" size={iconMedium} />
            <Text style={styles.topFont}>
              {weather.name || `${weather.coord.lat}, ${weather.coord.lon}`}
            </Text>
          </Box>
          <Box style={styles.topItem}>
            <Icon name="thermometer" size={iconMedium} />
            <Text style={styles.topFont}>{weather.main.temp}&deg;C</Text>
          </Box>
        </Box>
        <Box style={styles.topTime}>
          <IconFA name="clock" size={iconNormal} />
          <Text>{dt.toUTCString()}</Text>
        </Box>
      </Box>

      <Box style={styles.middleBoxContianer}>
        <Box style={styles.middleBox}>
          <Image
            source={{uri: getIconUrl(weather.weather[0].icon)}}
            style={{width: 60, height: 60}}
          />
          <Text>{weather.weather[0].main}</Text>
        </Box>

        <Box style={styles.middleBox}>
          <Text>Wind</Text>
          <Icon
            name="arrow-right-thin"
            style={{transform: [{rotate: `${weather.wind.deg}deg`}]}}
            size={40}
          />
          <Text>{weather.wind.speed} m/s</Text>
        </Box>
      </Box>

      <Card.Divider />

      {/* details */}
      <Box style={styles.detailsContainer}>
        <Box style={styles.detailsItemBox}>
          <Box style={styles.detailsItemBoxLabel}>
            <Icon name="thermometer-low" size={iconNormal} />
            <Text>Feels Like</Text>
          </Box>
          <Text style={styles.detailsItemBoxValue}>
            {weather.main.feels_like || 'N/A'}&deg;C
          </Text>
        </Box>

        <Box style={styles.detailsItemBox}>
          <Box style={styles.detailsItemBoxLabel}>
            <IconIsto name="cloudy-gusts" size={iconNormal} />
            <Text>Wind Gust</Text>
          </Box>
          <Text style={styles.detailsItemBoxValue}>
            {weather.wind.gust || 'N/A'} m/s
          </Text>
        </Box>

        <Box style={styles.detailsItemBox}>
          <Box style={styles.detailsItemBoxLabel}>
            <IconFA name="thermometer-full" size={iconNormal} />
            <Text>Maximum</Text>
          </Box>
          <Text style={styles.detailsItemBoxValue}>
            {weather.main.temp_max || 'N/A'}&deg;C
          </Text>
        </Box>

        <Box style={styles.detailsItemBox}>
          <Box style={styles.detailsItemBoxLabel}>
            <IconFA name="thermometer-quarter" size={iconNormal} />
            <Text>Minimum</Text>
          </Box>
          <Text style={styles.detailsItemBoxValue}>
            {weather.main.temp_min || 'N/A'}&deg;C
          </Text>
        </Box>

        <Box style={styles.detailsItemBox}>
          <Box style={styles.detailsItemBoxLabel}>
            <IconIon name="water" size={iconNormal} />
            <Text>Humidity</Text>
          </Box>
          <Text style={styles.detailsItemBoxValue}>
            {weather.main.humidity || 'N/A'}%
          </Text>
        </Box>

        <Box style={styles.detailsItemBox}>
          <Box style={styles.detailsItemBoxLabel}>
            <IconFA name="compress-alt" size={iconNormal} />
            <Text>Pressure</Text>
          </Box>
          <Text style={styles.detailsItemBoxValue}>
            {weather.main.pressure || 'N/A'} hPa
          </Text>
        </Box>

        <Box style={styles.detailsItemBox}>
          <Box style={styles.detailsItemBoxLabel}>
            <Icon name="beach" size={iconNormal} />
            <Text>Sea Level</Text>
          </Box>
          <Text style={styles.detailsItemBoxValue}>
            {weather.main.sea_level || 'N/A'} hPa
          </Text>
        </Box>

        <Box style={styles.detailsItemBox}>
          <Box style={styles.detailsItemBoxLabel}>
            <Icon name="home-flood" size={iconNormal} />
            <Text>Ground Level</Text>
          </Box>
          <Text style={styles.detailsItemBoxValue}>
            {weather.main.grnd_level || 'N/A'} hPa
          </Text>
        </Box>

        <Box style={styles.detailsItemBox}>
          <Box style={styles.detailsItemBoxLabel}>
            <IconM name="visibility" size={iconNormal} />
            <Text>Visibility</Text>
          </Box>
          <Text style={styles.detailsItemBoxValue}>
            {weather.visibility || 'N/A'}m
          </Text>
        </Box>

        <Box style={styles.detailsItemBox}>
          <Box style={styles.detailsItemBoxLabel}>
            <IconFA name="globe-asia" size={iconNormal} />
            <Text>Time Zone</Text>
          </Box>
          <Text style={styles.detailsItemBoxValue}>
            {secondsToUTCOffset(weather.timezone) || 'N/A'}
          </Text>
        </Box>
      </Box>

      <Card.Divider style={{marginTop: 10}} />

      <Stack
        mb="2.5"
        mt="1.5"
        direction={'row'}
        space={2}
        justifyContent={'flex-end'}>
        <Button
          colorScheme="primary"
          onPress={() => props.handleReload(weather.savedCityName)}>
          <Icon name="reload" color="white" size={iconMedium} />
        </Button>
        <Button
          colorScheme="secondary"
          onPress={() => props.handleDelete(weather.savedCityName)}>
          <Icon name="delete" color="white" size={iconMedium} />
        </Button>
      </Stack>
    </Card>
  );
};

export default WeatherCard;

const iconSmall = 15;
const iconNormal = 20;
const iconMedium = 25;
const iconLarge = 30;

const styles = StyleSheet.create({
  topBox: {
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topTime: {
    flex: 1,
    flexDirection: 'row',
    gap: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topFont: {
    fontSize: 18,
  },
  topItem: {
    gap: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  middleBoxContianer: {
    paddingVertical: 10,
    flex: 1,
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleBox: {
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#eee',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  detailsItemBox: {
    flexBasis: '40%',
    flexGrow: 1,
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderStyle: 'dashed',
    borderColor: '#bbb',
    borderBottomWidth: 1,
  },
  detailsItemBoxLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    fontSize: 12,
  },
  detailsItemBoxValue: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});
