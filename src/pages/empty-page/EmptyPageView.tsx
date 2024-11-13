import { Navigation } from "../../components/navigation/Navigation";
import { useNavigate } from 'react-router-dom';
import { COMPANY_ID, CONTACT_ID } from "../../const/constants";
import "./style.scss";

export const EmptyPageView = () => {
  const navigate = useNavigate();

  const handleReturnClick = () => {
    const fetchedCompanyId = COMPANY_ID;
    const fetchedContactId = CONTACT_ID;
    navigate(`/company/${fetchedCompanyId}/contact/${fetchedContactId}`);
  };

  return (
    <div className="empty">
      <h1 className="visually-hidden">Список организаций</h1>
      <Navigation />
      <div className="empty__block">
        <p>Список пока пуст</p>
        <button className="button" onClick={handleReturnClick}>
          Вернуться к карточке компании
        </button>
      </div>
    </div>
  );
};
