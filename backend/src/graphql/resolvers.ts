import { AuthenticationError, UserInputError } from 'apollo-server-express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { Customer } from '../models/Customer';
import { Lead } from '../models/Lead';
import { Opportunity } from '../models/Opportunity';

const generateToken = (user: any) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  );
};

export const resolvers = {
  Query: {
    me: async (_, __, { req }) => {
      // Authentication check will be implemented
      throw new Error('Not implemented');
    },
    users: async () => {
      // Will implement user fetching logic
      throw new Error('Not implemented');
    },
    user: async (_, { id }) => {
      // Will implement single user fetching logic
      throw new Error('Not implemented');
    },
    customers: async () => {
      // Will implement customer fetching logic
      throw new Error('Not implemented');
    },
    customer: async (_, { id }) => {
      // Will implement single customer fetching logic
      throw new Error('Not implemented');
    },
  },

  Mutation: {
    register: async (_, { input }) => {
      const { email, password, firstName, lastName, role } = input;

      // Will implement user registration logic
      throw new Error('Not implemented');
    },

    login: async (_, { input }) => {
      const { email, password } = input;

      // Will implement login logic
      throw new Error('Not implemented');
    },

    createCustomer: async (_, { input }, { req }) => {
      // Will implement customer creation logic
      throw new Error('Not implemented');
    },

    updateCustomer: async (_, { input }, { req }) => {
      // Will implement customer update logic
      throw new Error('Not implemented');
    },
  },

  Customer: {
    assignedTo: async (parent) => {
      // Will implement user fetching logic
      throw new Error('Not implemented');
    },
  },

  Lead: {
    customer: async (parent) => {
      // Will implement customer fetching logic
      throw new Error('Not implemented');
    },
    assignedTo: async (parent) => {
      // Will implement user fetching logic
      throw new Error('Not implemented');
    },
  },

  Opportunity: {
    customer: async (parent) => {
      // Will implement customer fetching logic
      throw new Error('Not implemented');
    },
    assignedTo: async (parent) => {
      // Will implement user fetching logic
      throw new Error('Not implemented');
    },
  },
};
