import React from "react";
import styles from "./TechRequests.module.css";
import Loader from "../../components/UI/Loader/Loader";
import ErrorBlock from "../../components/UI/ErrorBlock/ErrorBlock";
import TechRequestItem from "../../components/TechRequestItem/TechRequestItem";
import { useTechRequests } from "../../hooks/useTechRequests";
import ButtonUI from "../../components/UI/ButtonUI/ButtonUI";
import { useNavigate } from "react-router-dom";
import FilterTechRequest from "../../components/FilterTechRequest/FilterTechRequest";

const TechRequests: React.FC = () => {
  const navigate = useNavigate();
  const { filteredSortedTechRequests, isLoading, error } = useTechRequests();

  return (
    <main className="pageWrap">
      <h1 className="heading">Заявки на ТО и ремонт</h1>
      <FilterTechRequest />
      {isLoading && <Loader />}
      {error && <ErrorBlock error={error} />}
      <div className={styles.add}>
        <ButtonUI type="button" onClick={() => navigate('/tech_requests/0')}>
          Создать заявку
        </ButtonUI>
      </div>
      <div className={styles.techRequests}>
        {filteredSortedTechRequests?.map((techRequest) => (
          <TechRequestItem key={techRequest.request_id} techRequest={techRequest} />
        ))}
      </div>
    </main>
  );
};

export default TechRequests;