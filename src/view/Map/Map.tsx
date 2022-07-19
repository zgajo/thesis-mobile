import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import MapView, {
  MAP_TYPES,
  Marker,
  PROVIDER_DEFAULT,
  UrlTile,
} from 'react-native-maps';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as Location from 'expo-location';

const STATUS_BAR_HEIGHT = getStatusBarHeight();

export default function Map() {
  const map = useRef<MapView>(null);
  const [location, setLocation] = useState<{latitude: number; longitude: number}>(
    {
      latitude: 37.78825,
          longitude: -122.4324,
    }
  );

  const getLocation = () => {
    Location.getForegroundPermissionsAsync().then((result) => {
      console.log(result.granted);
      if (result.granted) {
        (async () => {
          try {
            let location = await Location.getCurrentPositionAsync({});
            
            setLocation({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude
            });
            
          } catch (error) {
            console.log(error);
          }
        })();
      }
    }).catch(console.log);
  };

  useEffect(getLocation, []);

  console.log("location:",location);

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
          ...location,
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
              center: location,
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
    // marginTop: STATUS_BAR_HEIGHT,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
