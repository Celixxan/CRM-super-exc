import { Customer, Lead, Opportunity } from '@/types';
import { loadFromLocalStorage, saveToLocalStorage } from './utils/localStorage';

// Default mock data for customers
const defaultCustomers: Customer[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    companyName: 'Acme Inc',
    status: 'Active',
    notes: 'Key client in manufacturing sector',
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-04-01T14:45:00Z',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    companyName: 'Tech Solutions',
    status: 'Active',
    notes: 'Interested in expanding services',
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-04-01T14:45:00Z',
  },
  {
    id: '3',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@example.com',
    phone: '555-123-4567',
    companyName: 'Johnson Enterprises',
    status: 'Inactive',
    notes: 'Former client, potential to reactivate',
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-04-01T14:45:00Z',
  },
];

// Load customers from localStorage or use defaults if not available
export const mockCustomers: Customer[] = typeof window !== 'undefined' 
  ? loadFromLocalStorage<Customer[]>('crm_customers', defaultCustomers)
  : [...defaultCustomers];

// Default mock data for leads
const defaultLeads: Lead[] = [
  {
    id: '1',
    customerId: '1',
    source: 'Website',
    status: 'New',
    notes: 'Interested in our premium package',
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-04-01T14:45:00Z',
  },
  {
    id: '2',
    customerId: '2',
    source: 'Referral',
    status: 'Qualified',
    notes: 'Referred by existing client',
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-04-01T14:45:00Z',
  },
  {
    id: '3',
    customerId: '3',
    source: 'LinkedIn',
    status: 'Contacted',
    notes: 'Initial call scheduled',
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-04-01T14:45:00Z',
  },
];

// Load leads from localStorage or use defaults if not available
export const mockLeads: Lead[] = typeof window !== 'undefined' 
  ? loadFromLocalStorage<Lead[]>('crm_leads', defaultLeads)
  : [...defaultLeads];

// Default mock data for opportunities
const defaultOpportunities: Opportunity[] = [
  {
    id: '1',
    customerId: '1',
    value: 50000,
    stage: 'Proposal',
    probability: 70,
    expectedCloseDate: '2025-05-15T00:00:00Z',
    notes: 'Proposal sent, awaiting feedback',
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-04-01T14:45:00Z',
  },
  {
    id: '2',
    customerId: '2',
    value: 25000,
    stage: 'Negotiation',
    probability: 85,
    expectedCloseDate: '2025-06-20T00:00:00Z',
    notes: 'Final contract details being discussed',
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-04-01T14:45:00Z',
  },
  {
    id: '3',
    customerId: '3',
    value: 75000,
    stage: 'Closed Won',
    probability: 100,
    expectedCloseDate: '2025-04-10T00:00:00Z',
    notes: 'Contract signed',
    createdAt: '2025-03-15T10:30:00Z',
    updatedAt: '2025-04-01T14:45:00Z',
  },
];

// Load opportunities from localStorage or use defaults if not available
export const mockOpportunities: Opportunity[] = typeof window !== 'undefined' 
  ? loadFromLocalStorage<Opportunity[]>('crm_opportunities', defaultOpportunities)
  : [...defaultOpportunities];

// Function to save all data to localStorage when changes are made
export const saveAllData = (): void => {
  if (typeof window !== 'undefined') {
    saveToLocalStorage('crm_customers', mockCustomers);
    saveToLocalStorage('crm_leads', mockLeads);
    saveToLocalStorage('crm_opportunities', mockOpportunities);
  }
};
