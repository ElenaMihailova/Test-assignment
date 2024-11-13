import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CompanyPageView } from "./CompanyPageView";
import { AppWrapper } from '../../layout/app-wrapper/AppWrapper';
import { getCompanyInfo, getContactInfo, updateCompanyInfo, updateContactInfo, deleteCompany, addCompanyImage, deleteCompanyImage } from '../../api/Api';
import { CompanyInfo, ContactInfo, PhotoInfo } from '../../types';
import { COMPANY_ID, CONTACT_ID } from "../../const/constants"

export const CompanyPage: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const activeCompanyId = companyId || COMPANY_ID;

  const fetchCompanyData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setError('Не удалось получить токен авторизации');
        return;
      }

      const companyData = await getCompanyInfo(activeCompanyId, token);
      setCompanyInfo(companyData);

      const contactData = await getContactInfo(CONTACT_ID, token);
      setContactInfo(contactData);
    } catch (error) {
      console.error(error)
      setError('Не удалось загрузить данные');
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const handleNameChange = async (newShortName: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      const updatedCompany = await updateCompanyInfo(COMPANY_ID, { shortName: newShortName }, token);
      setCompanyInfo((prev) => prev ? { ...prev, shortName: updatedCompany.shortName || newShortName } : null);
    } catch (error) {
      console.error('Ошибка при обновлении короткого названия компании:', error); // Логирование ошибки
      setError('Не удалось обновить короткое название компании');
    }
  };

  const handleFieldChange = (label: string, newValue: string) => {
    setCompanyInfo((prev) => {
      if (!prev) return prev;
      const updatedCompany = { ...prev };
      if (label === 'Полное название:') updatedCompany.name = newValue;
      else if (label === 'Форма:') updatedCompany.businessEntity = newValue;
      return updatedCompany;
    });
  };

  const handleContactFieldChange = (label: string, newValue: string) => {
    setContactInfo((prev) => {
      if (!prev) return prev;
      const updatedContact = { ...prev };

      if (label === 'ФИО:') {
        const [lastname, firstname, patronymic] = newValue.split(' ');
        updatedContact.lastname = lastname || updatedContact.lastname;
        updatedContact.firstname = firstname || updatedContact.firstname;
        updatedContact.patronymic = patronymic || updatedContact.patronymic;
      } else if (label === 'Телефон:') {
        updatedContact.phone = newValue.replace(/\D/g, '');
      } else if (label === 'Эл. почта:') {
        updatedContact.email = newValue;
      }
      return updatedContact;
    });
  };

  const saveCompanyInfo = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Не удалось получить токен авторизации');
      return;
    }

    if (!companyInfo) {
      setError('Информация о компании недоступна');
      return;
    }

    try {
      const updatedCompany = await updateCompanyInfo(COMPANY_ID, companyInfo, token);
      setCompanyInfo(updatedCompany);
    } catch (error) {
      console.error('Ошибка при обновлении информации о компании:', error);
      setError('Не удалось обновить информацию о компании');
    }
  };

  const saveContactInfo = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Не удалось получить токен авторизации');
      return;
    }

    if (!contactInfo) {
      setError('Контактная информация недоступна');
      return;
    }

    try {
      const updatedContact = await updateContactInfo(CONTACT_ID, contactInfo, token);
      setContactInfo(updatedContact);
    } catch (error) {
      console.error("Ошибка при обновлении контактной информации:", error);
      setError('Не удалось обновить контактную информацию');
    }
  };

  const handleDeleteCompany = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Не удалось получить токен авторизации');
      return;
    }

    try {
      await deleteCompany(COMPANY_ID, token);
      setCompanyInfo(null);
      alert('Компания была успешно удалена');
    } catch (error) {
      console.error('Ошибка при удалении компании:', error);
      setError('Не удалось удалить компанию');
    }
  };

  const handleAddPhoto = async (file: File) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Не удалось получить токен авторизации');
      return;
    }

    try {
      const newPhoto: PhotoInfo = await addCompanyImage(COMPANY_ID, file, token);
      setCompanyInfo((prevInfo) =>
        prevInfo ? { ...prevInfo, photos: [...prevInfo.photos, newPhoto] } : null
      );
    } catch (error) {
      alert("Ошибка при загрузке фото: " + error);
    }
  };

  const handleDeletePhoto = async (imageName: string) => {
    if (!imageName) {
      console.error("Не удалось удалить фото: имя файла не определено.");
      setError("Не удалось удалить фото: имя файла не определено.");
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Не удалось получить токен авторизации');
      return;
    }

    try {
      await deleteCompanyImage(COMPANY_ID, imageName, token);
      setCompanyInfo((prevInfo) =>
        prevInfo
          ? { ...prevInfo, photos: prevInfo.photos.filter((photo) => photo.name !== imageName) }
          : null
      );
    } catch (error) {
      console.error('Ошибка при удалении фото:', error);
      setError('Не удалось удалить фото');
    }
  };


  if (error) return <p>{error}</p>;
  if (!companyInfo) return <p>Нет информации</p>;
  if (!contactInfo) return <p>Загрузка контактной информации...</p>;

  return (
    <AppWrapper>
      <CompanyPageView
        companyInfo={companyInfo}
        contactInfo={contactInfo}
        onNameChange={handleNameChange}
        onFieldChange={handleFieldChange}
        onContactFieldChange={handleContactFieldChange}
        onSave={saveCompanyInfo}
        onSaveContact={saveContactInfo}
        onDeleteCompany={handleDeleteCompany}
        onAddPhoto={handleAddPhoto}
        onDeletePhoto={handleDeletePhoto}
      />
    </AppWrapper>
  );
};
