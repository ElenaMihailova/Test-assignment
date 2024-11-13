import instance from "./AxiosInstance";

export const getToken = async (username: string): Promise<string> => {
  try {
    const response = await instance.get('/auth', {
      params: { user: username }
    });
    const token = response.headers['authorization'];

    if (token) {
      return token.replace('Bearer ', '');
    } else {
      throw new Error('Токен не найден');
    }
  } catch (error) {
    console.error('Ошибка при получении токена:', error);
    throw error;
  }
};

export const getCompanyInfo = async (companyId: string, token: string) => {
  const cachedData = sessionStorage.getItem(`company_${companyId}`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await instance.get(`/companies/${companyId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    sessionStorage.setItem(`company_${companyId}`, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении информации о компании:', error);
    throw error;
  }
};

export const getContactInfo = async (contactId: string, token: string) => {
  const cachedData = sessionStorage.getItem(`contact_${contactId}`);
  if (cachedData) {
    return JSON.parse(cachedData);
  }

  try {
    const response = await instance.get(`/contacts/${contactId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    sessionStorage.setItem(`contact_${contactId}`, JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении информации о контакте:', error);
    throw error;
  }
};
