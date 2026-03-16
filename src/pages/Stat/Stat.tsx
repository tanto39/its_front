import React from "react";
import styles from "./Stat.module.css";
import Loader from "../../components/UI/Loader/Loader";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import { useStats } from "../../hooks/useStats";
import { Its } from "../../components/UI/Its/Its";

const Stat: React.FC = () => {
  const { stats, isLoading, error } = useStats();

  return (
    <main className="pageWrap">
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      <h1 className="heading">Статистика</h1>
      {stats && (
        <div className="contentBlock">
          <div className={styles.stat}>
            <div className={styles.statItem}>
              <span className={styles.label}>Индекс технического состояния (ИТС) автопарка </span>
              <span className={styles.value}>{stats.avgIts}</span>
              <Its its_val={stats.avgIts} label="" showIts={false} />
            </div>
            <div className={styles.statItem}>
              <span className={styles.label}>Количество автомобилей в автопарке</span>
              <span className={styles.value}>{stats.totalCars}</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.label}>Количество автомобилей с ИТС 70-100</span>
              <span className={styles.value}>{stats.count70_100}</span>
              <Its its_val={80} label="" showIts={false} />
            </div>
            <div className={styles.statItem}>
              <span className={styles.label}>Количество автомобилей с ИТС 30-69</span>
              <span className={styles.value}>{stats.count30_69}</span>
              <Its its_val={40} label="" showIts={false} />
            </div>
            <div className={styles.statItem}>
              <span className={styles.label}>Количество автомобилей с ИТС 0-29</span>
              <span className={styles.value}>{stats.count0_29}</span>
              <Its its_val={0} label="" showIts={false} />
            </div>
            <div className={styles.statItem}>
              <span className={styles.label}>Количество заявок на ТО и ремонт</span>
              <span className={styles.value}>{stats.totalRequests}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Stat;
