import { CompanyPageView } from "./CompanyPageView";
import { AppWrapper } from '../../layout/app-wrapper/AppWrapper';
import { useEffect, useState } from 'react';
import { getCompanyInfo, getContactInfo } from '../../api/Api';
import { CompanyInfo, ContactInfo } from '../../types';


export const CompanyPage: React.FC = () => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [, setShortName] = useState<string>('');
  const COMPANY_ID = '12';

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const companyData = await getCompanyInfo(COMPANY_ID, token);
          setCompanyInfo(companyData);
          setShortName(companyData.shortName);
          console.log(companyData);

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

  const handleNameChange = (newName: string) => {
    setShortName(newName);
  };

  if (error) return <p>{error}</p>;
  if (!companyInfo) return <p>Загрузка информации о компании...</p>;
  if (!contactInfo) return <p>Загрузка контактной информации...</p>;

  return (
    <AppWrapper>
      <CompanyPageView companyInfo={companyInfo} contactInfo={contactInfo} onNameChange={handleNameChange} />
    </AppWrapper>
  );
};
