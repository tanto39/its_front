import React from "react";
import styles from "./MessageModal.module.css";
import { setMessage } from "../../store/slices/message";
import { useAppDispatch, useAppSelector } from "../../store/helpers";
import { IMessage } from "../../types/index";

export const MessageModal: React.FC = () => {
  const { message } = useAppSelector((state) => state.message);
  const dispatch = useAppDispatch();

  const closeModal = async () => {
    const messageEmpty: IMessage = {
      type: "",
      title: "",
      message: "",
    };
    dispatch(setMessage(messageEmpty));
  };

  return (
    <div>
      {message.type && (
        <div>
          <section className={`${styles.popup} ${message.type == 'E' && styles.errorPopup}`}>
            <div className={styles.content}>
              <h2 className={styles.title}>{message.title}</h2>
              <div className={styles.message}>{message.message}</div>
            </div>
            <div className={styles.close} onClick={closeModal}></div>
          </section>
          <div className={styles.overlay} onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
};

export default MessageModal;
