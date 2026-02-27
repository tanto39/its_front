import React from "react";
import { DashboardItem } from "../../components/DashboardItem/DashboardItem";
import { useAppSelector } from "../../store/helpers";
import { UserRole } from "../../types/index";
import { boardLinks } from "./BoardLinks";
import styles from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <main className="pageWrap">
      <h1 className="heading">Система учета автопарка с расчетом индекса технического состояния (ИТС)</h1>
      <div className={styles.dashboardItems}>
        {user &&
          boardLinks
            .filter((board) => board.roles.includes(user.role_name as UserRole))
            .map((board, index) => {
              return <DashboardItem key={board.title} item={board} />;
            })}
      </div>
    </main>
  );
};

export default Dashboard;
