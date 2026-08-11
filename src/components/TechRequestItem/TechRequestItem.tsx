import React from "react";
import styles from "./TechRequestItem.module.css";
import { ITechRequest } from "../../types";
import { useNavigate } from "react-router-dom";
import span from "../../assets/images/span.svg";
import car from "../../assets/images/car.svg";
import today from "../../assets/images/today.svg";
import person from "../../assets/images/person.svg";
import status from "../../assets/images/status.svg";
import { useTechRequestItem } from "../../hooks/useTechRequestItem";

interface TechRequestItemProps {
  techRequest: ITechRequest;
}

const TechRequestItem: React.FC<TechRequestItemProps> = ({ techRequest }) => {
  const navigate = useNavigate();
  const { requestId, typeLabel, carName, carId, personFullName, formattedDate, statusLabel } =
    useTechRequestItem(techRequest);

  return (
    <div className={styles.request} onClick={() => navigate(`/tech_requests/${requestId}`)}>
      <h3 className={styles.request__title}>Заявка №{requestId}</h3>
      <div className={styles.request__info}>
        <img className={styles.request__img} src={span} alt="Тип" />
        <span className={styles.request__text}>{typeLabel}</span>
      </div>
      <div className={styles.request__info}>
        <img className={styles.request__img} src={car} alt="Автомобиль" />
        <span className={styles.request__text}>
          {carName} {carId}
        </span>
      </div>
      <div className={styles.request__info}>
        <img className={styles.request__img} src={person} alt="Ответственное лицо" />
        <span className={styles.request__text}>{personFullName}</span>
      </div>
      <div className={styles.request__info}>
        <img className={styles.request__img} src={today} alt="Дата" />
        <span className={styles.request__text}>{formattedDate}</span>
      </div>
      <div className={styles.request__info}>
        <img className={styles.request__img} src={status} alt="Статус" />
        <span className={styles.request__text}>{statusLabel}</span>
      </div>
    </div>
  );
};

export default TechRequestItem;
