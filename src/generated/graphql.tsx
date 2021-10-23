import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Campground = {
  __typename?: 'Campground';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  location: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCampground: Campground;
  deleteCampground: Scalars['Boolean'];
  login: UserResponse;
  register: UserResponse;
  updateCampground?: Maybe<Campground>;
};


export type MutationCreateCampgroundArgs = {
  location: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteCampgroundArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationUpdateCampgroundArgs = {
  id: Scalars['Int'];
  location: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  campground?: Maybe<Campground>;
  campgrounds: Array<Campground>;
  currentUser?: Maybe<User>;
};


export type QueryCampgroundArgs = {
  id: Scalars['Int'];
};

export type RegisterInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null | undefined, user?: { __typename?: 'User', id: number, username: string, name: string, email: string } | null | undefined } };


export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $name: String!, $email: String!) {
  register(
    options: {username: $username, password: $password, name: $name, email: $email}
  ) {
    errors {
      field
      message
    }
    user {
      id
      username
      name
      email
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};