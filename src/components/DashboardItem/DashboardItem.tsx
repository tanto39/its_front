import React from "react";
import { useNavigate } from "react-router-dom";
import { IBoardLinks } from "../../pages/Dashboard/BoardLinks";
import styles from "./DashboardItem.module.css";

interface IDashboardItemProps {
  item: IBoardLinks;
}

export const DashboardItem: React.FC<IDashboardItemProps> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.dashboardItem} onClick={() => navigate(item.link)}>
      <img className={styles.img} src={item.img} title={item.title} alt={item.title}/>
      <div className={styles.title}><span>{item.title}</span></div>
    </div>
  );
};
