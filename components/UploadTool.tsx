
import React, { useState, useRef } from 'react';
import { removeBackground } from '../services/geminiService';

const UploadTool: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const applyTransparency = (imgDataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(imgDataUrl);
          return;
        }
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Chroma key for #00FF00 (Neon Green)
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          
          // Check if pixel is close to #00FF00
          // Higher tolerance for green channel, lower for others
          if (g > 150 && r < 100 && b < 100) {
            data[i + 3] = 0; // Set alpha to 0
          }
        }
        ctx.putImageData(imageData, 0, 0);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = imgDataUrl;
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError("Please upload a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setOriginalImage(base64);
      setProcessedImage(null);
      setError(null);
      await processImageAction(base64);
    };
    reader.readAsDataURL(file);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setError(null);
      }
    } catch (err) {
      setError("Could not access camera. Please check permissions.");
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      const base64 = canvas.toDataURL('image/png');
      setOriginalImage(base64);
      stopCamera();
      processImageAction(base64);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const processImageAction = async (base64: string) => {
    setIsProcessing(true);
    setError(null);
    try {
      const resultWithGreen = await removeBackground(base64);
      const transparentResult = await applyTransparency(resultWithGreen);
      setProcessedImage(transparentResult);
    } catch (err) {
      setError("Failed to process image. Please try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!processedImage) return;
    const link = document.createElement('a');
    link.href = processedImage;
    link.download = 'clearcut-ai-result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden transition-all duration-500">
      <div className="p-6 md:p-12">
        {!originalImage && !isCameraActive ? (
          <div className="space-y-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all group"
            >
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleFileChange} 
              />
              <div className="mb-6 inline-flex w-20 h-20 items-center justify-center bg-blue-50 text-blue-600 rounded-full group-hover:scale-110 transition-transform">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Upload an Image</h3>
              <p className="text-slate-500 max-w-xs mx-auto mb-8">Drop your image here or click to browse. Supports PNG, JPG, and WebP.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 w-full sm:w-auto">
                  Select File
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); startCamera(); }}
                  className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Take Photo
                </button>
              </div>
            </div>
          </div>
        ) : isCameraActive ? (
          <div className="space-y-6 text-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
              <canvas ref={canvasRef} className="hidden" />
            </div>
            <div className="flex justify-center gap-4">
              <button 
                onClick={stopCamera}
                className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={takePhoto}
                className="bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
              >
                <div className="w-4 h-4 rounded-full border-2 border-white"></div>
                Capture
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Original</p>
                <div className="aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img src={originalImage || ''} alt="Original" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Transparent Result</p>
                <div className="aspect-square rounded-xl overflow-hidden bg-checkerboard border border-slate-200 relative">
                  {isProcessing ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                      <p className="text-slate-900 font-medium">Removing Background...</p>
                      <p className="text-xs text-slate-400 mt-1 italic">Gemini AI is crafting your image</p>
                    </div>
                  ) : processedImage ? (
                    <img src={processedImage} alt="Processed" className="w-full h-full object-contain animate-in fade-in zoom-in duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-400 italic">
                      Finalizing...
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100">
              <button 
                onClick={() => { setOriginalImage(null); setProcessedImage(null); }}
                className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Upload another
              </button>
              
              <div className="flex gap-3">
                <button 
                  disabled={!processedImage}
                  onClick={downloadImage}
                  className="bg-blue-600 disabled:bg-blue-300 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PNG
                </button>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-center gap-3 animate-shake">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadTool;
