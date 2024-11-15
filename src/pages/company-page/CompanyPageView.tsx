import { Card } from "../../components/card/Card";
import './styles.scss';
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
  onRefreshData: () => void;
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
  onRefreshData,
  onAddPhoto,
  onDeletePhoto,
}) => {
  return (
    <>
      <h1 className="visually-hidden">Страница организации</h1>
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
          onRefreshData={onRefreshData}
          onAddPhoto={onAddPhoto}
          onDeletePhoto={onDeletePhoto} />
      </div>
    </>
  );
};
