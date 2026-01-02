# automatic-face-emotion-scanner
# 🎭 Face Emotion Scanner

An AI-powered real-time facial emotion detection application built with React. Analyze emotions through your webcam with an intuitive and beautiful interface.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18+-61dafb.svg)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)

## ✨ Features

- 📹 **Real-time Webcam Analysis** - Continuous emotion detection from live video feed
- 😊 **7 Emotion Categories** - Detects Happy, Sad, Neutral, Surprised, Angry, Disgusted, and Fearful
- 📊 **Confidence Scoring** - Shows detection confidence percentage for each emotion
- 🎨 **Beautiful UI** - Modern gradient design with smooth animations
- 🔴 **Easy Controls** - Simple start/stop camera functionality
- 🎯 **Color-Coded Results** - Each emotion has unique colors and icons for quick recognition
- 📱 **Responsive Design** - Works on desktop and mobile devices

## 🚀 Demo

![Face Emotion Scanner Demo](demo-screenshot.png)

## 🛠️ Technologies Used

- **React** - UI framework
- **Lucide React** - Icon library
- **Tailwind CSS** - Styling
- **WebRTC** - Camera access via getUserMedia API
- **Canvas API** - Frame analysis

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/face-emotion-scanner.git
cd face-emotion-scanner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:3000`

## 🎯 Usage

1. **Grant Camera Permission**: Click "Start Scanning" and allow browser access to your camera
2. **Face the Camera**: Position your face in view of the webcam
3. **View Results**: The detected emotion will appear in real-time with confidence percentage
4. **Stop Scanning**: Click "Stop Scanning" to turn off the camera

## 🧠 How It Works

The application uses the following workflow:

1. **Camera Access** - Requests webcam access using WebRTC API
2. **Frame Capture** - Continuously captures video frames using Canvas API
3. **Image Analysis** - Analyzes pixel data for patterns and characteristics
4. **Emotion Detection** - Maps image features to emotion categories
5. **Result Display** - Shows detected emotion with confidence score

### Current Implementation

This demo version uses simulated emotion detection based on:
- Image brightness analysis
- Pixel variance calculation
- Pattern recognition algorithms

### Production Integration

For production-level accuracy, integrate with ML models:

**TensorFlow.js Example:**
```javascript
import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';

const model = await faceDetection.createDetector(
  faceDetection.SupportedModels.MediaPipeFaceDetector
);
```

**face-api.js Example:**
```javascript
import * as faceapi from 'face-api.js';

await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
await faceapi.nets.faceExpressionNet.loadFromUri('/models');

const detections = await faceapi
  .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
  .withFaceExpressions();
```

## 🔧 Configuration

### Emotion Categories

Modify the emotion list in the component:

```javascript
const emotions = ['Happy', 'Sad', 'Neutral', 'Surprised', 'Angry', 'Disgusted', 'Fearful'];
```

### Camera Settings

Adjust video constraints:

```javascript
const stream = await navigator.mediaDevices.getUserMedia({ 
  video: { 
    facingMode: 'user',
    width: { ideal: 1280 },
    height: { ideal: 720 }
  } 
});
```

## 📁 Project Structure

```
face-emotion-scanner/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── FaceEmotionScanner.jsx
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🎨 Customization

### Colors

Emotion colors are defined in the `emotionColors` object:

```javascript
const emotionColors = {
  'Happy': 'bg-yellow-400',
  'Sad': 'bg-blue-400',
  // Add or modify colors
};
```

### Icons

Icons can be changed using Lucide React components:

```javascript
import { Smile, Frown, Meh } from 'lucide-react';
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Known Issues

- Simulated detection is for demonstration purposes only
- Requires HTTPS for camera access in production
- Browser compatibility varies for WebRTC features

## 📝 Future Enhancements

- [ ] Integrate real ML models (TensorFlow.js, face-api.js)
- [ ] Add emotion history tracking and analytics
- [ ] Support multiple face detection
- [ ] Export emotion data as CSV/JSON
- [ ] Add screenshot capture feature
- [ ] Implement dark mode
- [ ] Add facial landmark visualization
- [ ] Support for recorded video analysis

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling utilities
- [React](https://reactjs.org/) team for the amazing framework
