import React from "react";
import styles from "./Cars.module.css";
import Loader from "../../components/UI/Loader/Loader";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import CarsItem from "../../components/CarsItem/CarsItem";
import { useCars } from "../../hooks/useCars";

const Cars: React.FC = () => {

  const { cars, isLoading, error } = useCars();
  
  return (
    <main className="pageWrap">
      <h1 className="heading">Автопарк</h1>
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      <div className={styles.cars}>
        {cars.map((car) => (
          <CarsItem car={car} />
        ))}
      </div>
    </main>
  );
};

export default Cars;
