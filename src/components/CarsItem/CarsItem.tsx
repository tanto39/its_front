import React from "react";
import styles from "./CarsItem.module.css";
import { ICar } from "../../types";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

interface carsItemProps {
  car: ICar;
}

const CarsItem: React.FC<carsItemProps> = ({ car }) => {

  const navigate = useNavigate();

  return (
    <div className={styles.car} onClick={() => navigate(`/cars/${car.car_id}`)}>
      <img src={BASE_URL + car.image_url} alt={car.name} title={car.name}/>
      {car.name}
    </div>
  );
};

export default CarsItem;
