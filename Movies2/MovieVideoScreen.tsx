import React, {useState, useCallback} from 'react';
import {Text, ScrollView, View, StatusBar, Dimensions} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function MovieVideoScreen({route}) {
  const [fullScreenPlayback, setFullScreenPlayback] = useState(false);
  const {video} = route.params;

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // // Currently react-native-youtube-iframe doesn't handle
  // // dynamic height and width changes properly
  // let width, height;
  // if (windowHeight >= windowWidth) {
  //   width = windowWidth;
  //   height = fullScreenPlayback ? windowHeight : width / (16 / 9);
  // } else {
  //   width = windowWidth;
  //   height = fullScreenPlayback ? windowHeight : windowHeight - 100;
  // }

  return (
    <ScrollView style={{backgroundColor: '#222222', flex: 1}}>
      <StatusBar hidden />
      <Text
        style={{
          color: 'white',
          paddingVertical: 5,
          paddingHorizontal: 20,
          fontSize: 18,
          fontWeight: '500',
        }}>
        {video.name}
      </Text>
      <View>
        <YoutubePlayer
          height={450}
          videoId={video.key}
          onFullScreenChange={setFullScreenPlayback}
        />
      </View>
    </ScrollView>
  );
}
