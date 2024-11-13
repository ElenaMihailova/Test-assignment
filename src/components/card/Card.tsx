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
}

export const Card: React.FC<CardProps> = ({ companyInfo, contactInfo }) => {
  const sections = [
    {
      title: 'ОБЩАЯ ИНФОРМАЦИЯ',
      fields: [
        { label: 'Полное название:', value: companyInfo.name || 'Информация недоступна' },
        {
          label: 'Договор:',
          value: `${companyInfo.contract.no} от ${new Date(companyInfo.contract.issue_date).toLocaleDateString('ru-RU')}`,
        },
        { label: 'Форма:', value: companyInfo.businessEntity || 'Информация недоступна' },
        { label: 'Тип:', value: companyInfo.type.map((t) => typeMapping[t] || t).join(', ') || 'Информация недоступна' },
      ],
    },
    {
      title: 'КОНТАКТНЫЕ ДАННЫЕ',
      fields: [
        { label: 'ФИО:', value: `${contactInfo.lastname} ${contactInfo.firstname} ${contactInfo.patronymic}` },
        { label: 'Телефон:', value: contactInfo.phone || 'Информация недоступна' },
        { label: 'Эл. почта:', value: contactInfo.email || 'Информация недоступна' },
      ],
    },
  ];

  return (
    <div className="card">
      <HeaderCard />
      <div className="card__content">
        <TitleCard name={companyInfo.shortName} />
        {sections.map((section, index) => (
          <CardSection key={index} title={section.title} fields={section.fields} />
        ))}
        <PhotoSection photos={companyInfo.photos} />
      </div>
    </div>
  );
};
