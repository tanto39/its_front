import React from "react";
import styles from "./ImageBlock.module.css";
import { useImage } from "../../../hooks/useImage";
import noimage from "../../../assets/images/noimage.jpg";

interface ImageBlockProps {
  imageUrl?: string | null;
  onFileSelect?: (file: File | null) => void;
  className?: string;
}

const ImageBlock: React.FC<ImageBlockProps> = ({ imageUrl, onFileSelect, className = "" }) => {
  const { previewUrl, fileInputRef, handleFileChange, isModalOpen, openModal, closeModal } = useImage({
    imageUrl,
    onFileSelect,
  });

  return (
    <div className={`${styles.imageBlock} ${className}`}>
      {previewUrl && !previewUrl.includes("undefined") ? (
        <div className={styles.previewWrapper}>
          <img src={previewUrl} alt="Предпросмотр" className={styles.preview} onClick={openModal} />
        </div>
      ) : (
        <img src={noimage} alt="Предпросмотр" className={styles.preview} />
      )}
      <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className={styles.fileInput} />

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={previewUrl || undefined} alt="Полный размер" className={styles.modalImage} />
          </div>
          <div className={styles.closeButton} onClick={closeModal}>✕</div>
        </div>
      )}
    </div>
  );
};

export default ImageBlock;
