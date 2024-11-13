import { CompanyPageView } from "./CompanyPageView";
import { AppWrapper } from '../../layout/app-wrapper/AppWrapper';
import { useEffect, useState } from 'react';
import { getCompanyInfo, getContactInfo } from '../../api/Api';

interface CompanyInfo {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: {
    no: string;
    issue_date: string;
  };
  type: string[];
  status: string;
  photos: {
    name: string;
    filepath: string;
    thumbpath: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

interface ContactInfo {
  id: string;
  lastname: string;
  firstname: string;
  patronymic: string;
  phone: string;
  email: string;
  position?: string;
  name: string; 
}

export const CompanyPage: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const COMPANY_ID = '12';

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const companyData = await getCompanyInfo(COMPANY_ID, token);
          setCompanyInfo(companyData);
          console.log(companyData);

          // Получение информации о контакте после получения информации о компании
          if (companyData.contactId) {
            const contactData = await getContactInfo(companyData.contactId, token);
            setContactInfo(contactData);
            console.log(contactData);
          }
        } else {
          console.error('Токен не найден');
          setError('Не удалось получить токен авторизации');
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        setError('Не удалось загрузить данные');
      }
    };

    fetchCompanyData();
  }, []);

  if (error) return <p>{error}</p>;
  if (!companyInfo) return <p>Загрузка информации о компании...</p>;
  if (!contactInfo) return <p>Загрузка контактной информации...</p>;

  return (
    <AppWrapper>
      <CompanyPageView companyInfo={companyInfo} contactInfo={contactInfo} />
    </AppWrapper>
  );
};
