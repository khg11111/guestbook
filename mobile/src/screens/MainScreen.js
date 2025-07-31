import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const MainScreen = ({ navigation }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout },
      ]
    );
  };

  const handleCameraCapture = () => {
    if (!user) {
      Alert.alert('Authentication Required', 'Please login to use this feature');
      return;
    }
    navigation.navigate('Camera', { mode: 'camera' });
  };

  const handleImageUpload = () => {
    if (!user) {
      Alert.alert('Authentication Required', 'Please login to use this feature');
      return;
    }
    navigation.navigate('Camera', { mode: 'gallery' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Image Description App</Text>
        <Text style={styles.subtitle}>
          Capture or upload images to get AI-powered descriptions
        </Text>
      </View>

      {user ? (
        <View style={styles.userSection}>
          <Text style={styles.welcomeText}>Welcome, {user.email}!</Text>
          <TouchableOpacity
            style={styles.userButton}
            onPress={() => navigation.navigate('User')}
          >
            <Icon name="settings" size={20} color="#fff" />
            <Text style={styles.buttonText}>User Settings</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.authSection}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('SignUp')}
          >
            <Icon name="person-add" size={20} color="#fff" />
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => navigation.navigate('Login')}
          >
            <Icon name="login" size={20} color="#007AFF" />
            <Text style={[styles.buttonText, { color: '#007AFF' }]}>Log In</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.actionSection}>
        <Text style={styles.sectionTitle}>Image Actions</Text>
        
        <TouchableOpacity
          style={[styles.button, styles.cameraButton]}
          onPress={handleCameraCapture}
        >
          <Icon name="camera-alt" size={24} color="#fff" />
          <Text style={styles.buttonText}>Capture Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.uploadButton]}
          onPress={handleImageUpload}
        >
          <Icon name="photo-library" size={24} color="#fff" />
          <Text style={styles.buttonText}>Upload Image</Text>
        </TouchableOpacity>
      </View>

      {user && (
        <TouchableOpacity
          style={[styles.button, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Icon name="logout" size={20} color="#fff" />
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  userSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  authSection: {
    marginBottom: 30,
  },
  actionSection: {
    flex: 1,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
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
  userButton: {
    backgroundColor: '#6c757d',
  },
  cameraButton: {
    backgroundColor: '#28a745',
  },
  uploadButton: {
    backgroundColor: '#17a2b8',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    marginTop: 'auto',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 8,
  },
});

export default MainScreen;