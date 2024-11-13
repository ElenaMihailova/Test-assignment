export interface ContractInfo {
  no: string;
  issue_date: string;
}

export interface PhotoInfo {
  name: string;
  filepath: string;
  thumbpath: string;
}

export interface CompanyInfo {
  id: string;
  contactId: string;
  name: string;
  shortName: string;
  businessEntity: string;
  contract: ContractInfo;
  type: string[];
  status: string;
  photos: PhotoInfo[];
  createdAt: string;
  updatedAt: string;
}

export interface ContactInfo {
  id: string;
  lastname: string;
  firstname: string;
  patronymic: string;
  phone: string;
  email: string;
  position?: string;
}

