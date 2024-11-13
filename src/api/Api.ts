import instance from "./AxiosInstance";
import axios from 'axios';

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
  const dataToSend = {
    name: updatedData.name,
    shortName: updatedData.shortName,
    businessEntity: updatedData.businessEntity,
    contract: updatedData.contract
      ? {
        no: updatedData.contract.no,
        issue_date: updatedData.contract.issue_date,
      }
      : undefined,
    type: updatedData.type,
  };

  try {
    const response = await instance.patch(
      `/companies/${companyId}`,
      dataToSend,
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

export const addCompanyImage = async (companyId: string, file: File, token: string) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(
      `/companies/${companyId}/image`,
      formData,
      {
        baseURL: instance.defaults.baseURL,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
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
  const dataToSend = {
    lastname: updatedData.lastname,
    firstname: updatedData.firstname,
    patronymic: updatedData.patronymic,
    phone: updatedData.phone,
    email: updatedData.email,
  };

  try {
    const response = await instance.patch(
      `/contacts/${contactId}`,
      dataToSend,
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

export const deleteCompanyImage = async (companyId: string, imageName: string, token: string) => {
  try {
    const response = await axios.delete(
      `/companies/${companyId}/image/${imageName}`,
      {
        baseURL: instance.defaults.baseURL,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Ошибка при удалении изображения:', error);
    throw error;
  }
};

