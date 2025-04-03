export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: string;
  customerId: string;
  source: string;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Opportunity {
  id: string;
  customerId: string;
  value: number;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  status: string;
  notes: string;
}

export interface LeadFormData {
  customerId: string;
  source: string;
  status: string;
  notes: string;
}

export interface OpportunityFormData {
  customerId: string;
  value: number;
  stage: string;
  probability: number;
  expectedCloseDate: string;
  notes: string;
}
