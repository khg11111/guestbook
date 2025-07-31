import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserScreen = ({ navigation }) => {
  const [selectedLevel, setSelectedLevel] = useState('detailed');
  const { user, logout } = useAuth();

  useEffect(() => {
    loadSelectedLevel();
  }, []);

  const loadSelectedLevel = async () => {
    try {
      const saved = await AsyncStorage.getItem('descriptionLevel');
      if (saved) {
        setSelectedLevel(saved);
      }
    } catch (error) {
      console.error('Error loading description level:', error);
    }
  };

  const saveSelectedLevel = async (level) => {
    try {
      await AsyncStorage.setItem('descriptionLevel', level);
      setSelectedLevel(level);
    } catch (error) {
      console.error('Error saving description level:', error);
    }
  };

  const descriptionLevels = [
    {
      id: 'basic',
      title: 'Basic',
      description: 'Simple, concise descriptions',
      icon: 'short-text',
    },
    {
      id: 'detailed',
      title: 'Detailed',
      description: 'Comprehensive descriptions with more context',
      icon: 'text-fields',
    },
    {
      id: 'comprehensive',
      title: 'Comprehensive',
      description: 'In-depth analysis with artistic and technical details',
      icon: 'article',
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: () => {
            logout();
            navigation.navigate('Main');
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>User Settings</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description Level</Text>
        <Text style={styles.sectionSubtitle}>
          Choose how detailed you want your image descriptions to be
        </Text>

        <View style={styles.levelContainer}>
          {descriptionLevels.map((level) => (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.levelOption,
                selectedLevel === level.id && styles.levelOptionSelected,
              ]}
              onPress={() => saveSelectedLevel(level.id)}
            >
              <View style={styles.levelHeader}>
                <Icon 
                  name={level.icon} 
                  size={24} 
                  color={selectedLevel === level.id ? '#007AFF' : '#666'} 
                />
                <View style={styles.levelInfo}>
                  <Text style={[
                    styles.levelTitle,
                    selectedLevel === level.id && styles.levelTitleSelected,
                  ]}>
                    {level.title}
                  </Text>
                  <Text style={styles.levelDescription}>
                    {level.description}
                  </Text>
                </View>
                {selectedLevel === level.id && (
                  <Icon name="check-circle" size={24} color="#007AFF" />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity
          style={styles.accountOption}
          onPress={() => Alert.alert('Info', 'Profile editing coming soon!')}
        >
          <Icon name="person" size={24} color="#666" />
          <Text style={styles.accountOptionText}>Edit Profile</Text>
          <Icon name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.accountOption}
          onPress={() => Alert.alert('Info', 'Change password feature coming soon!')}
        >
          <Icon name="lock" size={24} color="#666" />
          <Text style={styles.accountOptionText}>Change Password</Text>
          <Icon name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.accountOption}
          onPress={() => Alert.alert('Info', 'Privacy settings coming soon!')}
        >
          <Icon name="privacy-tip" size={24} color="#666" />
          <Text style={styles.accountOptionText}>Privacy Settings</Text>
          <Icon name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Icon name="logout" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
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
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  levelContainer: {
    gap: 15,
  },
  levelOption: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  levelOptionSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#f0f8ff',
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelInfo: {
    flex: 1,
    marginLeft: 15,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  levelTitleSelected: {
    color: '#007AFF',
  },
  levelDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  accountOption: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  accountOptionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 'auto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default UserScreen;