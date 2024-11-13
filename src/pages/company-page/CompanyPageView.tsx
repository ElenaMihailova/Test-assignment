import { Card } from "../../components/card/Card";
import './styles.scss';
import { Navigation } from "../../components/navigation/Navigation";
import { CompanyInfo, ContactInfo } from '../../types';


interface CompanyPageViewProps {
  companyInfo: CompanyInfo;
  contactInfo: ContactInfo;
  onNameChange: (newName: string) => void;
  onFieldChange: (label: string, newValue: string) => void;
  onContactFieldChange: (label: string, newValue: string) => void;
  onSave: () => void;
  onSaveContact?: () => void;
  onDeleteCompany: () => void;
  onAddPhoto: (file: File) => void;
  onDeletePhoto: (imageName: string) => void;
}

export const CompanyPageView: React.FC<CompanyPageViewProps> = ({
  companyInfo,
  contactInfo,
  onNameChange,
  onFieldChange,
  onContactFieldChange,
  onSave,
  onSaveContact,
  onDeleteCompany,
  onAddPhoto,
  onDeletePhoto,
}) => {
  return (
    <>
      <h1 className="visually-hidden">Страница организации</h1>
      <Navigation />
      <div className="company">
        <Card
          companyInfo={companyInfo}
          contactInfo={contactInfo}
          onNameChange={onNameChange}
          onFieldChange={onFieldChange}
          onContactFieldChange={onContactFieldChange}
          onSave={onSave}
          onSaveContact={onSaveContact}
          onDeleteCompany={onDeleteCompany}
          onAddPhoto={onAddPhoto}
          onDeletePhoto={onDeletePhoto} />
      </div>
    </>
  );
};
