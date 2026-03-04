import React, { useState, useEffect, useRef } from "react";
import styles from "./ImageBlock.module.css";
import { BASE_URL } from "../../../constants";

interface ImageBlockProps {
  imageUrl?: string | null;
  onFileSelect?: (file: File | null) => void;
  className?: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ imageUrl, onFileSelect, className = "" }) => {
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

  return (
    <div className={`${styles.imageBlock} ${className}`}>
      {previewUrl && !previewUrl.includes('undefined') ? (
        <div className={styles.previewWrapper}>
          <img src={previewUrl} alt="Предпросмотр" className={styles.preview} />
        </div>
      ) : (
        <img src='/public/images/no-image.jpg' alt="Предпросмотр" className={styles.preview} />
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className={styles.fileInput} />
    </div>
  );
};

export default ImageBlock;
