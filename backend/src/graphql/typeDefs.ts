import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  type Customer {
    id: ID!
    companyName: String
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    status: String!
    assignedTo: User
    createdAt: String!
    updatedAt: String!
  }

  type Lead {
    id: ID!
    source: String!
    status: String!
    customer: Customer!
    assignedTo: User
    notes: String
    createdAt: String!
    updatedAt: String!
  }

  type Opportunity {
    id: ID!
    customer: Customer!
    status: String!
    value: Float!
    expectedCloseDate: String
    assignedTo: User
    probability: Float
    notes: String
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input CreateUserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    role: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateCustomerInput {
    companyName: String
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    status: String!
  }

  input UpdateCustomerInput {
    id: ID!
    companyName: String
    firstName: String
    lastName: String
    email: String
    phone: String
    status: String
  }

  type Query {
    me: User!
    users: [User!]!
    user(id: ID!): User
    customers: [Customer!]!
    customer(id: ID!): Customer
    leads: [Lead!]!
    lead(id: ID!): Lead
    opportunities: [Opportunity!]!
    opportunity(id: ID!): Opportunity
  }

  type Mutation {
    register(input: CreateUserInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    createCustomer(input: CreateCustomerInput!): Customer!
    updateCustomer(input: UpdateCustomerInput!): Customer!
    deleteCustomer(id: ID!): Boolean!
    createLead(customerId: ID!): Lead!
    updateLeadStatus(id: ID!, status: String!): Lead!
    createOpportunity(customerId: ID!, value: Float!): Opportunity!
    updateOpportunityStatus(id: ID!, status: String!): Opportunity!
  }

  type Subscription {
    customerUpdated: Customer!
    leadUpdated: Lead!
    opportunityUpdated: Opportunity!
  }
`;
