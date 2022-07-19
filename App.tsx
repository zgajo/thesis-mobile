import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as Location from 'expo-location';
import * as React from 'react';
import { checkGPSPermission } from './src/utils/device';
import Map from './src/view/Map';

const Tab = createBottomTabNavigator();

export default function App() {
  const requestCameraPermission = async () => {
    try {
      if (!await checkGPSPermission()) {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          }
        })();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  React.useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={Map} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
