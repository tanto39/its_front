import React from "react";
import styles from "./Units.module.css";
import { IUnit } from "../../types";
import UnitsItem from "../UnitsItem/UnitsItem";
import ButtonUI from "../UI/ButtonUI/ButtonUI";
import { useNavigate } from "react-router-dom";

interface UnitsProps {
  units: IUnit[];
}

export const Units: React.FC<UnitsProps> = ({ units }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="heading">Сборочные единицы (узлы, агрегаты)</h2>
      <div  className={styles.add}>
        <ButtonUI type="button" onClick={() => navigate(`/unit/0`)}>
          Добавить сборочную единицу
        </ButtonUI>
      </div>
      <div className={styles.units}>
        {units.map((unit) => (
          <UnitsItem unit={unit} />
        ))}
      </div>
    </div>
  );
};

export default Units;
