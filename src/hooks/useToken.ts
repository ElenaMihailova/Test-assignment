import { useState } from 'react';

export const useToken = () => {
  const [error, setError] = useState<string | null>(null);

  const getToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError('Не удалось получить токен авторизации');
      return null;
    }
    return token;
  };

  return { getToken, error };
};
