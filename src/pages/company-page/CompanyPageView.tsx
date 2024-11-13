import { Card } from "../../components/card/Card";
import './styles.scss';
import { Navigation } from "../../components/navigation/Navigation";
import { CompanyInfo, ContactInfo } from '../../types';


interface CompanyPageViewProps {
  companyInfo: CompanyInfo;
  contactInfo: ContactInfo;
  onNameChange: (newName: string) => void;
}

export const CompanyPageView: React.FC<CompanyPageViewProps> = ({ companyInfo, contactInfo, onNameChange }) => {
  return (
    <>
      <h1 className="visually-hidden">Страница организации</h1>
      <Navigation />
      <div className="company">
        <Card companyInfo={companyInfo} contactInfo={contactInfo} onNameChange={onNameChange} />
      </div>
    </>
  );
};
