import React, { useState, useRef, useEffect } from 'react';
import { Camera, AlertCircle, Smile, Frown, Meh, Heart, Zap } from 'lucide-react';

const FaceEmotionScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [emotion, setEmotion] = useState(null);
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);

  const emotions = ['Happy', 'Sad', 'Neutral', 'Surprised', 'Angry', 'Disgusted', 'Fearful'];
  
  const emotionIcons = {
    'Happy': <Smile className="w-8 h-8" />,
    'Sad': <Frown className="w-8 h-8" />,
    'Neutral': <Meh className="w-8 h-8" />,
    'Surprised': <Zap className="w-8 h-8" />,
    'Angry': <AlertCircle className="w-8 h-8" />,
    'Disgusted': <AlertCircle className="w-8 h-8" />,
    'Fearful': <Heart className="w-8 h-8" />
  };

  const emotionColors = {
    'Happy': 'bg-yellow-400',
    'Sad': 'bg-blue-400',
    'Neutral': 'bg-gray-400',
    'Surprised': 'bg-purple-400',
    'Angry': 'bg-red-400',
    'Disgusted': 'bg-green-400',
    'Fearful': 'bg-orange-400'
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
        setError('');
        
        videoRef.current.onloadedmetadata = () => {
          analyzeFrame();
        };
      }
    } catch (err) {
      setError('Unable to access camera. Please grant camera permissions.');
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsScanning(false);
    setEmotion(null);
    setConfidence(0);
  };

  const analyzeFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    // Simulate emotion detection with realistic-looking analysis
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const detectedEmotion = detectEmotion(imageData);
    
    setEmotion(detectedEmotion.emotion);
    setConfidence(detectedEmotion.confidence);

    animationRef.current = requestAnimationFrame(analyzeFrame);
  };

  const detectEmotion = (imageData) => {
    // Simulated emotion detection based on image brightness and patterns
    const data = imageData.data;
    let brightness = 0;
    let variance = 0;
    
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      brightness += avg;
    }
    
    brightness = brightness / (data.length / 4);
    
    // Calculate simple variance
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      variance += Math.pow(avg - brightness, 2);
    }
    variance = Math.sqrt(variance / (data.length / 4));

    // Map brightness and variance to emotions with some randomness for realism
    const timeVariation = Math.sin(Date.now() / 1000) * 0.1;
    const score = (brightness / 255) + (variance / 100) + timeVariation;
    
    let selectedEmotion;
    if (score > 0.7) selectedEmotion = 'Happy';
    else if (score > 0.5) selectedEmotion = 'Surprised';
    else if (score > 0.4) selectedEmotion = 'Neutral';
    else if (score > 0.3) selectedEmotion = 'Sad';
    else if (score > 0.2) selectedEmotion = 'Angry';
    else if (score > 0.1) selectedEmotion = 'Fearful';
    else selectedEmotion = 'Disgusted';

    const conf = Math.min(95, 65 + Math.random() * 25);

    return {
      emotion: selectedEmotion,
      confidence: Math.round(conf)
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Face Emotion Scanner
            </h1>
            <p className="text-gray-600">AI-powered real-time emotion detection</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg flex items-center gap-3 text-red-700">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          )}

          <div className="relative mb-6 bg-gray-900 rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <canvas ref={canvasRef} className="hidden" />
            
            {!isScanning && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <Camera className="w-24 h-24 text-gray-600" />
              </div>
            )}

            {isScanning && emotion && (
              <div className="absolute top-4 left-4 right-4">
                <div className="bg-black bg-opacity-70 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className={`${emotionColors[emotion]} p-3 rounded-full text-white`}>
                      {emotionIcons[emotion]}
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-2xl font-bold">{emotion}</div>
                      <div className="text-gray-300 text-sm">Confidence: {confidence}%</div>
                    </div>
                  </div>
                  <div className="mt-3 bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className={`h-full ${emotionColors[emotion]} transition-all duration-300`}
                      style={{ width: `${confidence}%` }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
            {!isScanning ? (
              <button
                onClick={startScanning}
                className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold text-lg hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl flex items-center gap-3"
              >
                <Camera className="w-6 h-6" />
                Start Scanning
              </button>
            ) : (
              <button
                onClick={stopScanning}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold text-lg hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl"
              >
                Stop Scanning
              </button>
            )}
          </div>

          <div className="mt-8 grid grid-cols-3 md:grid-cols-7 gap-3">
            {emotions.map((em) => (
              <div
                key={em}
                className={`p-3 rounded-xl text-center transition-all ${
                  emotion === em
                    ? `${emotionColors[em]} text-white scale-110 shadow-lg`
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <div className="flex justify-center mb-1">
                  {emotionIcons[em]}
                </div>
                <div className="text-xs font-medium">{em}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>This is a demonstration using simulated emotion detection.</p>
            <p>For production use, integrate with ML models like TensorFlow.js or face-api.js</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceEmotionScanner;