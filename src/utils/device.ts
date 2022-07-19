import * as Location from 'expo-location';

export const checkGPSPermission = async () => {
  try {
    
    //result would be false if not granted and true if required permission is granted.
    const result = await Location.getForegroundPermissionsAsync()
    return result.granted;
  } catch (error) {
    console.log("error", error)
  }
};