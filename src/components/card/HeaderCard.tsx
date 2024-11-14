import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Linked from "../../assets/icons/Linked.png";
import Rotation from "../../assets/icons/Rotation.png";
import Delete from "../../assets/icons/Delete.png";
import IconPrimary from "../../components/IconPrimary";
import Arrow from "../../assets/icons/Arrow.png";
import { COMPANY_ID } from "../../const/constants";

interface HeaderCardProps {
  onDeleteCompany: () => void;
  onRefreshData: () => void;
}

export const HeaderCard: React.FC<HeaderCardProps> = ({ onDeleteCompany, onRefreshData }) => {
  const { companyId } = useParams<{ companyId: string }>();
  const path = `/company/${companyId || COMPANY_ID}`;

  const buttons = [
    { src: Linked, alt: "Linked", disabled: true },
    { src: Rotation, alt: "Rotation", action: onRefreshData },
    { src: Delete, alt: "Delete", action: onDeleteCompany },
  ];

  return (
    <header className="card__header">
      <Link to={path} className="card__nav">
        <IconPrimary src={Arrow} alt="Arrow" /> К СПИСКУ ЮРИДИЧЕСКИХ ЛИЦ
      </Link>
      <div>
        {buttons.map((button, index) => (
          <button
            key={index}
            className="card__nav-button"
            onClick={button.action}
            disabled={button.disabled} >
            <IconPrimary src={button.src} alt={button.alt} />
          </button>
        ))}
      </div>
    </header>
  );
};
