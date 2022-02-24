import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import { Face } from 'expo-camera/build/Camera.types';

// import { Container } from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraContainer: {
    top: 0,
    backgroundColor: '#fff',
    color: '#000',
    flexDirection: 'row',
    margin: 20,
  },
  contentContainer: {
    flex: 1
  },
  buttonContainer: {
    bottom: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  faceInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#157',
    borderRadius: 20,
    padding: 8
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

const FaceDetectionCamera: React.FC = () => {
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [faces, setFaces] = useState<Face[]>([]);

  const handleRequestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  }

  useEffect(() => {

    (async () => {
      if (Platform.OS === "web") {
        if (await Camera.isAvailableAsync()) {
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

      onFacesDetected={({ faces }) => {
        setFaces(faces);
      }}
      faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.accurate,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        runClassifications: FaceDetector.FaceDetectorClassifications.all,
        minDetectionInterval: 500,
        tracking: true,
      }}
    >
      <>
        <View style={styles.cameraContainer}>
          {faces.map(face => {
            const eyeShut = face.rightEyeOpenProbability < 0.4 && face.leftEyeOpenProbability < 0.4;
            const winking = !eyeShut && (face.rightEyeOpenProbability < 0.4 || face.leftEyeOpenProbability < 0.4);
            const smilling = face.smilingProbability > 0.7;

            return (
              <View key={`face-description-${face.faceID}`} style={styles.faceInfoContainer}>
                <Text>Olhos fechados: {String(eyeShut)}</Text>
                <Text>Piscando: {String(winking)}</Text>
                <Text>Sorrindo: {String(smilling)}</Text>
              </View>
            );
          })}
        </View>
        <View style={styles.contentContainer}>
          {faces.map(face => {

            const customStyles = {
              box: {
                top: face.bounds.origin.y - (face.bounds.size.height / 2),
                left: face.bounds.origin.x,
              },
              content: {
                width: face.bounds.size.width,
                height: face.bounds.size.height,
                borderWidth: 2,
                borderColor: '#ffeb3b',
                backgroundColor: '#ffeb3b1c',
              }
            };

            return (
              <View key={`face-tracker-${face.faceID}`} style={customStyles.box}>
                <View style={customStyles.content}></View>
              </View>
            );
          })}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleFlipCamera}
          >
            <Text style={styles.text}> Girar camera </Text>
          </TouchableOpacity>
        </View>
      </>
    </Camera>
  );
}

export default FaceDetectionCamera;
