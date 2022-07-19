import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import MapView, { MAP_TYPES, Marker, PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const STATUS_BAR_HEIGHT = getStatusBarHeight();

export default function Map() {
  const map = useRef<MapView>(null);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" translucent backgroundColor="transparent" />
     
      <MapView
        ref={map}
        // provider={PROVIDER_DEFAULT} // remove if not using Google Maps
        style={styles.map}
        mapType={MAP_TYPES.STANDARD}
        showsUserLocation={true}
        showsMyLocationButton={true}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
          maximumZ={19}
        />
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          description={'This is a marker in React Natve'}
        >
          <Image
            source={require('../../images/car-icon-top-view-7.jpeg')}
            style={{ height: 35, width: 35 }}
          />
        </Marker>
      </MapView>
      <Button
        onPress={() => {
          if (map.current) {
            map.current.animateCamera({
              center: {
                latitude: 37.78825,
                longitude: -122.4324,
              },
              heading: 0,
              pitch: 90,
              zoom: 20,
            });
          }
        }}
        title="Show drive mode"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
