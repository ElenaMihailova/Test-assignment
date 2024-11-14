import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CompanyPageView } from "./CompanyPageView";
import { AppWrapper } from '../../layout/app-wrapper/AppWrapper';
import { updateCompanyInfo, updateContactInfo, deleteCompany, addCompanyImage, deleteCompanyImage } from '../../api/Api';
import { PhotoInfo } from '../../types';
import { COMPANY_ID, CONTACT_ID } from "../../const/constants";
import { useCompanyInfo, useContactInfo } from '../../hooks/useCompanyInfo';
import { useEffect } from 'react';

export const CompanyPage: React.FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();
  const activeCompanyId = companyId || COMPANY_ID;

  const [error, setError] = useState<string | null>(null);
  const { data: companyInfo, isLoading: isCompanyLoading, error: companyError, setData: setCompanyInfo, refetch: refetchCompanyInfo } = useCompanyInfo(activeCompanyId);
  const { data: contactInfo, isLoading: isContactLoading, error: contactError, setData: setContactInfo, refetch: refetchContactInfo } = useContactInfo();

  useEffect(() => {
    if (!companyInfo && !isCompanyLoading) {
      navigate(`/company/${COMPANY_ID}`, { replace: true });
    }
  }, [companyInfo, isCompanyLoading, navigate]);

  if (isCompanyLoading || isContactLoading || !companyInfo || !contactInfo) {
    return <p>Загрузка...</p>;
  }
  if (companyError) return <p>{companyError}</p>;
  if (contactError) return <p>{contactError}</p>;

  const handleNameChange = async (newShortName: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      const updatedCompany = await updateCompanyInfo(activeCompanyId, { shortName: newShortName }, token);
      setCompanyInfo((prev) => prev ? { ...prev, shortName: updatedCompany.shortName || newShortName } : null);
    } catch (error) {
      console.error('Ошибка при обновлении короткого названия компании:', error);
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

    try {
      const updatedCompany = await updateCompanyInfo(activeCompanyId, companyInfo, token);
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

    try {
      const updatedContact = await updateContactInfo(CONTACT_ID, contactInfo, token);
      setContactInfo(updatedContact);
    } catch (error) {
      console.error("Ошибка при обновлении контактной информации:", error);
    }
  };

  const handleDeleteCompany = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Не удалось получить токен авторизации');
      return;
    }

    try {
      await deleteCompany(activeCompanyId, token);
      setCompanyInfo(null);
      alert('Компания была успешно удалена');
    } catch (error) {
      console.error('Ошибка при удалении компании:', error);
      setError('Не удалось удалить компанию');
    }
  };

  const handleRefreshData = () => {
    refetchCompanyInfo();
    refetchContactInfo();
    alert('Данные обновлены');
  };

  const handleAddPhoto = async (file: File) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Не удалось получить токен авторизации');
      return;
    }

    try {
      const newPhoto: PhotoInfo = await addCompanyImage(activeCompanyId, file, token);
      setCompanyInfo((prevInfo) =>
        prevInfo ? { ...prevInfo, photos: [...prevInfo.photos, newPhoto] } : null
      );
    } catch (error) {
      console.error("Ошибка при загрузке фото:", error);
      setError("Ошибка при загрузке фото");
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
      await deleteCompanyImage(activeCompanyId, imageName, token);
      setCompanyInfo((prevInfo) =>
        prevInfo ? { ...prevInfo, photos: prevInfo.photos.filter((photo) => photo.name !== imageName) } : null
      );
    } catch (error) {
      console.error('Ошибка при удалении фото:', error);
      setError('Не удалось удалить фото');
    }
  };

  if (error) return <p>{error}</p>;
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
        onRefreshData={handleRefreshData}
        onAddPhoto={handleAddPhoto}
        onDeletePhoto={handleDeletePhoto}
      />
    </AppWrapper>
  );
};
