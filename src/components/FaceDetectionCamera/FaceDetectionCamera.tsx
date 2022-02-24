import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as FaceDetector from 'expo-face-detector';

// import { Container } from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

const FaceDetectionCamera: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const handleRequestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  }

  useEffect(() => {

    (async () => {
      if (Platform.OS === "web") {
        if(await Camera.isAvailableAsync()){
          handleRequestCameraPermission();
        } else {
          setHasPermission(false);
        }
      } else {
        handleRequestCameraPermission();
      }
    })();

  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const handleFlipCamera = () => {
    setType(
      type === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  return (
    <Camera
    style={styles.camera}
    type={type}

    onFacesDetected={(faces) => {
      console.log(faces)
    }}
    faceDetectorSettings={{
      mode: FaceDetector.FaceDetectorMode.fast,
      detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
      runClassifications: FaceDetector.FaceDetectorClassifications.none,
      minDetectionInterval: 100,
      tracking: true,
    }}
    >
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleFlipCamera}>
          <Text style={styles.text}> Flip </Text>
        </TouchableOpacity>
      </View>
    </Camera>
  );
}

export default FaceDetectionCamera;
