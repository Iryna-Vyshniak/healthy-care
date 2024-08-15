'use server';

import { ID, Query } from 'node-appwrite';

import { users } from '../appwrite.config';
import { parseStringify } from '../utils';

// CREATE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined, // for future password implementation
      user.name
    );

    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      // User already exists, retrieving the existing user details
      const documents = await users.list([Query.equal('email', [user.email])]);
      return documents?.users[0];
    }
    console.error('An error occurred while creating a new user:', error);
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      'An error occurred while retrieving the user details:',
      error
    );
  }
};
