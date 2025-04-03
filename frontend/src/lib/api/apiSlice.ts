import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockCustomers, mockLeads, mockOpportunities, saveAllData } from '../mockData';
import { RootState } from '../store';
import { CustomerFormData, LeadFormData, OpportunityFormData } from '@/types';

interface GraphQLResponse {
  data: any;
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000',
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// Create the API slice with endpoints
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['User', 'Customer', 'Lead', 'Opportunity'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: () => {
        // Mock response that matches the expected structure in login page
        return {
          data: {
            login: {
              token: 'mock-token-12345',
              user: {
                id: '1',
                email: 'admin@example.com',
                firstName: 'Admin',
                lastName: 'User',
                role: 'admin',
              }
            }
          }
        };
      },
    }),
    
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
      transformResponse: () => {
        // Mock response that matches the expected structure in register page
        return {
          data: {
            register: {
              token: 'mock-token-new-user',
              user: {
                id: '2',
                email: 'user@example.com',
                firstName: 'New',
                lastName: 'User',
                role: 'user',
              }
            }
          }
        };
      },
    }),

    createCustomer: builder.mutation({
      query: (customerData) => ({
        url: '/customers',
        method: 'POST',
        body: customerData,
      }),
      transformResponse: (response, meta, arg) => {
        const newCustomer = {
          ...arg,
          id: String(mockCustomers.length + 1),
          createdAt: '2025-04-03T18:00:00Z',
          updatedAt: '2025-04-03T18:00:00Z',
        };
        mockCustomers.push(newCustomer);
        saveAllData(); // Save to localStorage
        return { data: { customer: newCustomer } };
      },
      invalidatesTags: ['Customer']
    }),

    getCustomers: builder.query({
      query: () => '/customers',
      transformResponse: () => ({
        data: {
          customers: mockCustomers,
        },
      }),
      providesTags: ['Customer'],
    }),

    createLead: builder.mutation({
      query: (leadData) => ({
        url: '/leads',
        method: 'POST',
        body: leadData,
      }),
      transformResponse: (response, meta, arg) => {
        const newLead = {
          ...arg,
          id: String(mockLeads.length + 1),
          createdAt: '2025-04-03T18:00:00Z',
          updatedAt: '2025-04-03T18:00:00Z',
        };
        mockLeads.push(newLead);
        saveAllData(); // Save to localStorage
        return { data: { lead: newLead } };
      },
      invalidatesTags: ['Lead']
    }),

    getLeads: builder.query({
      query: () => '/leads',
      transformResponse: () => ({
        data: {
          leads: mockLeads,
        },
      }),
      providesTags: ['Lead'],
    }),

    createOpportunity: builder.mutation({
      query: (opportunityData) => ({
        url: '/opportunities',
        method: 'POST',
        body: opportunityData,
      }),
      transformResponse: (response, meta, arg) => {
        const newOpportunity = {
          ...arg,
          id: String(mockOpportunities.length + 1),
          createdAt: '2025-04-03T18:00:00Z',
          updatedAt: '2025-04-03T18:00:00Z',
        };
        mockOpportunities.push(newOpportunity);
        saveAllData(); // Save to localStorage
        return { data: { opportunity: newOpportunity } };
      },
      invalidatesTags: ['Opportunity']
    }),

    getOpportunities: builder.query({
      query: () => '/opportunities',
      transformResponse: () => ({
        data: {
          opportunities: mockOpportunities,
        },
      }),
      providesTags: ['Opportunity'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetCustomersQuery,
  useCreateCustomerMutation,
  useGetLeadsQuery,
  useCreateLeadMutation,
  useGetOpportunitiesQuery,
  useCreateOpportunityMutation,
} = apiSlice;
