import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const CameraScreen = ({ navigation, route }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionLevel, setDescriptionLevel] = useState('detailed');
  
  const { token } = useAuth();
  const mode = route.params?.mode || 'camera';

  useEffect(() => {
    loadDescriptionLevel();
    if (mode === 'camera') {
      handleCameraLaunch();
    } else {
      handleGalleryLaunch();
    }
  }, []);

  const loadDescriptionLevel = async () => {
    try {
      const saved = await AsyncStorage.getItem('descriptionLevel');
      if (saved) {
        setDescriptionLevel(saved);
      }
    } catch (error) {
      console.error('Error loading description level:', error);
    }
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        navigation.goBack();
        return;
      }
      
      if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
        navigation.goBack();
        return;
      }

      if (response.assets && response.assets[0]) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const handleGalleryLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        navigation.goBack();
        return;
      }
      
      if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
        navigation.goBack();
        return;
      }

      if (response.assets && response.assets[0]) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const uploadAndDescribeImage = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'No image selected');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('image', {
        uri: selectedImage.uri,
        type: selectedImage.type,
        name: selectedImage.fileName || 'image.jpg',
      });
      formData.append('descriptionLevel', descriptionLevel);

      const response = await fetch('http://localhost:3000/api/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setDescription(data.description);
      } else {
        Alert.alert('Error', data.error || 'Failed to process image');
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const retakePhoto = () => {
    setSelectedImage(null);
    setDescription('');
    if (mode === 'camera') {
      handleCameraLaunch();
    } else {
      handleGalleryLaunch();
    }
  };

  const getLevelDisplayName = (level) => {
    const levels = {
      basic: 'Basic',
      detailed: 'Detailed',
      comprehensive: 'Comprehensive'
    };
    return levels[level] || 'Detailed';
  };

  if (!selectedImage) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>
            {mode === 'camera' ? 'Opening Camera...' : 'Opening Gallery...'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage.uri }} style={styles.image} />
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.levelText}>
            Description Level: {getLevelDisplayName(descriptionLevel)}
          </Text>
          
          {!description && (
            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={uploadAndDescribeImage}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Icon name="auto-awesome" size={20} color="#fff" />
                  <Text style={styles.buttonText}>Generate Description</Text>
                </>
              )}
            </TouchableOpacity>
          )}

          {description && (
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionTitle}>AI Description:</Text>
              <Text style={styles.descriptionText}>{description}</Text>
            </View>
          )}
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={retakePhoto}
          >
            <Icon name="refresh" size={20} color="#007AFF" />
            <Text style={[styles.buttonText, { color: '#007AFF' }]}>
              {mode === 'camera' ? 'Retake Photo' : 'Choose Another'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.tertiaryButton]}
            onPress={() => navigation.navigate('User')}
          >
            <Icon name="settings" size={20} color="#666" />
            <Text style={[styles.buttonText, { color: '#666' }]}>
              Change Level
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: width - 40,
    height: (width - 40) * 0.75,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  descriptionContainer: {
    marginTop: 15,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    textAlign: 'justify',
  },
  actionContainer: {
    gap: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  tertiaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
});

export default CameraScreen;