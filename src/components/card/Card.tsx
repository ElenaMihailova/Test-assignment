import { HeaderCard } from "./HeaderCard";
import { TitleCard } from '../title-card/TitleCard';
import './styles.scss';
import { CardSection } from "./CardSection";
import { PhotoSection } from './PhotoSection';

import { typeMapping } from '../../const/typeMapping';
import { CompanyInfo, ContactInfo } from '../../types';

interface CardProps {
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

export const Card: React.FC<CardProps> = ({ companyInfo,
  contactInfo,
  onNameChange,
  onFieldChange,
  onContactFieldChange,
  onSave,
  onSaveContact,
  onDeleteCompany,
  onAddPhoto,
  onDeletePhoto,}) => {
  const sections = [
    {
      title: 'ОБЩАЯ ИНФОРМАЦИЯ',
      fields: [
        { label: 'Полное название:', value: companyInfo.name || 'Информация недоступна', editable: true },
        {
          label: 'Договор:',
          value: `${companyInfo.contract.no} от ${new Date(companyInfo.contract.issue_date).toLocaleDateString('ru-RU')}`,
          editable: false,
        },
        { label: 'Форма:', value: companyInfo.businessEntity || 'Информация недоступна', editable: true },
        { label: 'Тип:', value: companyInfo.type.map((t) => typeMapping[t] || t).join(', ') || 'Информация недоступна', editable: false },
      ],
      onFieldChange,
    },
    {
      title: 'КОНТАКТНЫЕ ДАННЫЕ',
      fields: [
        { label: 'ФИО:', value: `${contactInfo.lastname} ${contactInfo.firstname} ${contactInfo.patronymic}`, editable: true },
        { label: 'Телефон:', value: contactInfo.phone || 'Информация недоступна', editable: true },
        { label: 'Эл. почта:', value: contactInfo.email || 'Информация недоступна', editable: true },
      ],
      onFieldChange: onContactFieldChange,
    },
  ];

  return (
    <div className="card">
      <HeaderCard onDeleteCompany={onDeleteCompany} />
      <div className="card__content">
        <TitleCard name={companyInfo.shortName} onNameChange={onNameChange} />
        {sections.map((section, index) => (
          <CardSection
            key={index}
            title={section.title}
            fields={section.fields}
            onFieldChange={section.onFieldChange}
            onSave={onSave}
            onSaveContact={index === 1 ? onSaveContact : undefined}
          />
        ))}
        <PhotoSection photos={companyInfo.photos} onAddPhoto={onAddPhoto} onDeletePhoto={onDeletePhoto} />
      </div>
    </div>
  );
};
