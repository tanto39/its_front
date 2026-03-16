import React from "react";
import styles from "./TechRequestItem.module.css";
import { ITechRequest } from "../../types";
import { useNavigate } from "react-router-dom";

interface TechRequestItemProps {
  techRequest: ITechRequest;
}

const TechRequestItem: React.FC<TechRequestItemProps> = ({ techRequest }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.request} onClick={() => navigate(`/tech_requests/${techRequest.request_id}`)}>
      <h3 className={styles.request__title}>Заявка №{techRequest.request_id}</h3>
      <div className={styles.request__info}>
        <img className={styles.request__img} src="/public/images/span.svg" alt="Тип" />
        <span className={styles.request__text}>{techRequest.request_type === "to" ? "ТО" : "Ремонт"}</span>
      </div>
      <div className={styles.request__info}>
        <img className={styles.request__img} src="/public/images/car.svg" alt="Автомобиль" />
        <span className={styles.request__text}>
          {techRequest.car?.name} {techRequest.car_id}
        </span>
      </div>
      <div className={styles.request__info}>
        <img className={styles.request__img} src="/public/images/person.svg" alt="Ответственное лицо" />
        <span className={styles.request__text}>
          {techRequest.person?.second_name} {techRequest.person?.first_name} {techRequest.person?.middle_name}
        </span>
      </div>
      <div className={styles.request__info}>
        <img className={styles.request__img} src="/public/images/today.svg" alt="Дата" />
        <span className={styles.request__text}>
          {techRequest.date_repair}
        </span>
      </div>
    </div>
  );
};

export default TechRequestItem;
