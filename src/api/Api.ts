import instance from "./axiosInstance";

export const getToken = async (username) => {
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
