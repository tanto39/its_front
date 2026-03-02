import React from "react";
import styles from "./UnitsItem.module.css";
import { IUnit } from "../../types";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { Its } from "../UI/Its/Its";

interface UnitProps {
  unit: IUnit;
}

export const UnitsItem: React.FC<UnitProps> = ({ unit }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.unit} onClick={() => navigate(`/unit/${unit.unit_id}`)}>
      <div className={styles.topInfo}>
        <div className={styles.name}>{unit.name}</div>
        <div className={styles.its}>
          <span className={styles.label}>ИТС</span>
          <Its its_val={unit.its} label="" customClassName="itsSmall" />
        </div>
      </div>
      <img className={styles.image} src={BASE_URL + unit.image_url} alt={unit.name} title={unit.name} />
    </div>
  );
};

export default UnitsItem;
