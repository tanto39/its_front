import { useState, useEffect, useRef } from "react";
import { BASE_URL } from "../constants";

interface UseImageProps {
  imageUrl?: string | null;
  onFileSelect?: (file: File | null) => void;
}

export const useImage = ({ imageUrl, onFileSelect }: UseImageProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(BASE_URL + imageUrl || null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewUrl(BASE_URL + imageUrl);
  }, [imageUrl]);

  // Очистка ObjectURL при размонтировании или замене файла
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Очищаем предыдущий blob URL, если он был
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      setSelectedFile(file);
      onFileSelect?.(file);
    }
  };

  return {
    previewUrl,
    selectedFile,
    fileInputRef,
    handleFileChange,
  };
};