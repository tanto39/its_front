import React from "react";
import styles from "./MessageModal.module.css";
import { setMessage } from "../../store/slices/message";
import { useAppDispatch, useAppSelector } from "../../store/helpers";
import { IMessage } from "../../types/index";
import ButtonUI from "../UI/ButtonUI/ButtonUI";

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

  const handleConfirm = () => {
    if (message.onConfirm) {
      message.onConfirm();
    }
    closeModal();
  };

  const isConfirm = message.type === "C"; // тип "C" означает подтверждение

  return (
    <div>
      {message.type && (
        <div>
          <section className={`${styles.popup} ${message.type == "E" && styles.errorPopup}`}>
            <div className={styles.content}>
              <h2 className={styles.title}>{message.title}</h2>
              <div className={styles.message}>{message.message}</div>
            </div>
            {isConfirm && (
              <div className={styles.confirmButtons}>
                <ButtonUI onClick={handleConfirm} btnClass="btnConfirm">
                  Да
                </ButtonUI>
                <ButtonUI onClick={closeModal} btnClass="btnConfirm">
                  Нет
                </ButtonUI>
              </div>
            )}
            <div className={styles.close} onClick={closeModal}></div>
          </section>
          <div className={styles.overlay} onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
};

export default MessageModal;
