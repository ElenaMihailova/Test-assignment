import { useState, useEffect } from 'react';
import { getCompanyInfo, getContactInfo } from '../api/Api';
import { CompanyInfo, ContactInfo } from '../types';
import { CONTACT_ID } from "../const/constants";

export const useCompanyInfo = (companyId: string) => {
  const [data, setData] = useState<CompanyInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Не удалось получить токен авторизации');
      const companyData = await getCompanyInfo(companyId, token);
      setData(companyData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [companyId]);

  return { data, setData, isLoading, error, refetch: fetchData };
};

export const useContactInfo = () => {
  const [data, setData] = useState<ContactInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('Не удалось получить токен авторизации');
      const contactData = await getContactInfo(CONTACT_ID, token);
      setData(contactData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, setData, isLoading, error, refetch: fetchData };
};

