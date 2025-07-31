# Image Description Mobile App

A React Native mobile application that generates AI-powered text descriptions for captured or uploaded images. The app includes user authentication, customizable description levels, and a clean, modern interface.

## Features

### Main Page
- **Sign Up**: Create a new account with email validation
- **Log In**: Authenticate with existing credentials
- **Camera Capture**: Take photos directly from the app
- **Image Upload**: Select images from device gallery

### Authentication
- **Sign Up Page**: 
  - Email and password registration
  - Real-time email duplicate checking
  - Password confirmation validation
  - Secure password hashing with bcrypt

- **Log In Page**:
  - Email and password authentication
  - JWT token-based session management
  - Password visibility toggle

### User Settings
- **Description Level Selection**:
  - **Basic**: Simple, concise descriptions
  - **Detailed**: Comprehensive descriptions with more context
  - **Comprehensive**: In-depth analysis with artistic and technical details
- **Account management options**
- **Secure logout functionality**

### Image Processing
- **Camera Integration**: Direct photo capture using device camera
- **Gallery Access**: Select existing photos from device storage
- **AI Description Generation**: Generate descriptions based on selected detail level
- **Real-time Processing**: Upload and process images with loading indicators

## Technology Stack

### Backend
- **Node.js** with Express.js framework
- **SQLite** database for user management
- **JWT** for authentication
- **bcrypt** for password hashing
- **Multer** for file uploads
- **CORS** enabled for mobile app communication

### Mobile App
- **React Native** 0.72.6
- **React Navigation** for screen management
- **AsyncStorage** for local data persistence
- **React Native Image Picker** for camera/gallery access
- **Vector Icons** for UI elements

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Backend Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start the backend server**:
   ```bash
   npm start
   ```
   The server will run on `http://localhost:3000`

### Mobile App Setup

1. **Navigate to mobile directory**:
   ```bash
   cd mobile
   ```

2. **Install mobile dependencies**:
   ```bash
   npm install
   ```

3. **For iOS (macOS only)**:
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start Metro bundler**:
   ```bash
   npm start
   ```

5. **Run on Android**:
   ```bash
   npm run android
   ```

6. **Run on iOS**:
   ```bash
   npm run ios
   ```

### Configuration

1. **Backend Configuration**:
   - The app uses SQLite database (automatically created)
   - JWT secret key is set to 'your-secret-key' (change in production)
   - Upload directory is created at `./uploads/`

2. **Mobile App Configuration**:
   - Update API base URL in `AuthContext.js` if deploying backend elsewhere
   - Ensure proper permissions for camera and storage access

## API Endpoints

### Authentication
- `POST /api/signup` - Create new user account
- `POST /api/login` - Authenticate user
- `POST /api/check-email` - Check email availability

### Image Processing
- `POST /api/upload-image` - Upload image and generate description (requires authentication)

## File Structure

```
├── app.js                          # Express server setup
├── package.json                    # Backend dependencies
├── uploads/                        # Image upload directory
├── mobile/                         # React Native app
│   ├── App.js                     # Main app component
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.js     # Authentication context
│   │   └── screens/
│   │       ├── MainScreen.js      # Main page
│   │       ├── SignUpScreen.js    # Sign up page
│   │       ├── LoginScreen.js     # Login page
│   │       ├── UserScreen.js      # User settings
│   │       └── CameraScreen.js    # Image capture/upload
│   ├── package.json               # Mobile dependencies
│   └── index.js                   # App entry point
└── README.md                      # This file
```

## Usage

1. **Start the backend server** using `npm start`
2. **Launch the mobile app** on your device or emulator
3. **Create an account** or log in with existing credentials
4. **Capture or upload an image** using the main page buttons
5. **Generate AI descriptions** with your preferred detail level
6. **Adjust settings** in the user page to change description levels

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Email validation and duplicate checking
- Secure file upload handling
- CORS configuration for mobile app access

## Future Enhancements

- Integration with advanced AI models (OpenAI GPT-4 Vision, Google Vision API)
- Image history and favorites
- Social sharing capabilities
- Offline description caching
- Multi-language support
- Advanced image editing features

## License

This project is for educational and demonstration purposes.