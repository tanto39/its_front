import React from "react";
import styles from "./CarsItem.module.css";
import { ICar } from "../../types";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { Its } from "../UI/Its/Its";

interface carsItemProps {
  car: ICar;
}

const CarsItem: React.FC<carsItemProps> = ({ car }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.car} onClick={() => navigate(`/cars/${car.car_id}`)}>
      <img className={styles.car__img} src={BASE_URL + car.image_url} alt={car.name} title={car.name} />
      <div className={styles.car__info}>
        <h3 className={styles.car__title}>{car.name}</h3>
        <div className={styles.car__nums}>
          <span className={styles.car__uid}>УИД: {car.car_id}</span>
          <span className={styles.car__regnum}>Регистрационный номер: {car.reg_number}</span>
        </div>
        <div className={styles.car__person}>
          Ответственное лицо: {car.person?.second_name} {car.person?.first_name} {car.person?.middle_name}
        </div>
      </div>
      <div className={styles.car__its}>
        <span className={styles.car__labelIts}>ИТС</span>
        <Its its_val={car.its} label="" customClassName="itsSmall" />
      </div>
    </div>
  );
};

export default CarsItem;
