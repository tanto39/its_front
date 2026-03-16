import React from "react";
import styles from "./Cars.module.css";
import Loader from "../../components/UI/Loader/Loader";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import CarsItem from "../../components/CarsItem/CarsItem";
import { useCars } from "../../hooks/useCars";
import ButtonUI from "../../components/UI/ButtonUI/ButtonUI";
import { useNavigate } from "react-router-dom";
import Filter from "../../components/Filter/Filter";

const Cars: React.FC = () => {
  const navigate = useNavigate();
  const { filteredSortedCars, isLoading, error } = useCars();

  return (
    <main className="pageWrap">
      <h1 className="heading">Автопарк</h1>
      <Filter />
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      <div className={styles.addCar}>
        <ButtonUI type="button" onClick={() => navigate('/cars/0')}>
          Добавить автомобиль
        </ButtonUI>
      </div>
      <div className={styles.cars}>
        {filteredSortedCars?.map((car) => (
          <CarsItem key={car.car_id} car={car} />
        ))}
      </div>
    </main>
  );
};

export default Cars;
