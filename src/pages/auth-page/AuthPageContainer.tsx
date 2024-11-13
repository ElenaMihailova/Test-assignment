import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthPageView } from './AuthPageView';
import { getToken } from '../../api/Api'
import { COMPANY_ID, CONTACT_ID } from "../../const/constants"

export const AuthPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    try {
      const token = await getToken(username);
      if (token) {
        localStorage.setItem('authToken', token);
        const fetchedCompanyId = COMPANY_ID;
        const fetchedContactId = CONTACT_ID;
        navigate(`/company/${fetchedCompanyId}/contact/${fetchedContactId}`);
      }
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
    }
  };

  return (
    <AuthPageView
      username={username}
      setUsername={setUsername}
      handleLogin={handleLogin}
    />
  );
};
