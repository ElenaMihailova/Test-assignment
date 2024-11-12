import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthPageView } from './AuthPageView';
import { getToken } from '../../api/Api'

export const AuthPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const handleLogin = async () => {
    try {
      const token = await getToken('USERNAME');
      if (token) {
        localStorage.setItem('authToken', token);
        navigate('/company');
      }
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
    }
  }

  return (
    <AuthPageView
      username={username}
      setUsername={setUsername}
      handleLogin={handleLogin}
    />
  );
};
