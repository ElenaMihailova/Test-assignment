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


export const updateCompanyInfo = async (
  companyId: string,
  updatedData: {
    name?: string;
    shortName?: string;
    businessEntity?: string;
    contract?: {
      no?: string;
      issue_date?: string;
    };
    type?: string[];
  },
  token: string
) => {
  try {
    const response = await instance.patch(
      `/companies/${companyId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении данных компании:', error);
    throw error;
  }
};

export const deleteCompany = async (companyId: string, token: string) => {
  try {
    const response = await instance.delete(`/companies/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении компании:', error);
    throw error;
  }
};

export const addCompanyImage = async (
  companyId: string,
  file: File,
  token: string
) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await instance.post(`/companies/${companyId}/image`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при добавлении изображения компании:', error);
    throw error;
  }
};

export const updateContactInfo = async (
  contactId: string,
  updatedData: {
    lastname?: string;
    firstname?: string;
    patronymic?: string;
    phone?: string;
    email?: string;
  },
  token: string
) => {
  try {
    const response = await instance.patch(
      `/contacts/${contactId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Ошибка при обновлении данных контакта:', error);
    throw error;
  }
};




