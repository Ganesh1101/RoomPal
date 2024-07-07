import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [markedLocation, setMarkedLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const handleMarkerPress = (event) => {
    const coordinate = event.nativeEvent.coordinate;
    setMarkedLocation(coordinate);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onPress={handleMarkerPress}
      >
        <Marker coordinate={markedLocation} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapScreen;
