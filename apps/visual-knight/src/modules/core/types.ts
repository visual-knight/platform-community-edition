import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
}

export interface AuthPayload {
  __typename?: 'AuthPayload';
  token: AuthToken;
  user: User;
}

export interface AuthToken {
  __typename?: 'AuthToken';
  expiresIn: Scalars['Int'];
  accessToken: Scalars['String'];
}

export interface Mutation {
  __typename?: 'Mutation';
  login: AuthPayload;
  signup: AuthPayload;
  verifyEmail: Scalars['Boolean'];
  resendVerifyEmail: Scalars['Boolean'];
  changePassword: Scalars['Boolean'];
  forgotPassword: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  deleteUser: User;
  updateUser: User;
  inviteNewUser: User;
  completeInvitation: AuthPayload;
  createProject: ProjectType;
  deleteProject: ProjectType;
  updateProject: ProjectType;
  deleteTestSession: TestSessionType;
  updateTestSession: TestSessionType;
  deleteTest: TestType;
  deleteVariation: VariationType;
}

export interface MutationLoginArgs {
  password: Scalars['String'];
  email: Scalars['String'];
}

export interface MutationSignupArgs {
  password: Scalars['String'];
  email: Scalars['String'];
}

export interface MutationVerifyEmailArgs {
  token: Scalars['String'];
}

export interface MutationChangePasswordArgs {
  password: Scalars['String'];
}

export interface MutationForgotPasswordArgs {
  email: Scalars['String'];
}

export interface MutationResetPasswordArgs {
  token: Scalars['String'];
  password: Scalars['String'];
}

export interface MutationDeleteUserArgs {
  id: Scalars['String'];
}

export interface MutationUpdateUserArgs {
  data: UpdateUserInput;
}

export interface MutationInviteNewUserArgs {
  email: Scalars['String'];
}

export interface MutationCompleteInvitationArgs {
  password: Scalars['String'];
  token: Scalars['String'];
}

export interface MutationCreateProjectArgs {
  data: ProjectDataArgs;
}

export interface MutationDeleteProjectArgs {
  projectId: Scalars['String'];
}

export interface MutationUpdateProjectArgs {
  data: ProjectDataArgs;
  projectId: Scalars['String'];
}

export interface MutationDeleteTestSessionArgs {
  testSessionId: Scalars['String'];
}

export interface MutationUpdateTestSessionArgs {
  data: TestSessionDataArgs;
  testSessionId: Scalars['String'];
}

export interface MutationDeleteTestArgs {
  testId: Scalars['String'];
}

export interface MutationDeleteVariationArgs {
  variationId: Scalars['String'];
}

export interface ProjectDataArgs {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
}

export interface ProjectType {
  __typename?: 'ProjectType';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
}

export interface Query {
  __typename?: 'Query';
  me: User;
  project: ProjectType;
  projects: Array<ProjectType>;
  projectsCount: Scalars['Int'];
  testSession: TestSessionType;
  testSessions: Array<TestSessionType>;
  testSessionsCount: Scalars['Int'];
  test: TestType;
  tests: Array<TestType>;
  testsCount: Scalars['Int'];
  variation: VariationType;
  variations: Array<VariationType>;
  variationsCount: Scalars['Int'];
}

export interface QueryProjectArgs {
  projectId: Scalars['String'];
}

export interface QueryTestSessionArgs {
  testSessionId: Scalars['String'];
}

export interface QueryTestSessionsArgs {
  where?: Maybe<TestSessionDataArgs>;
}

export interface QueryTestSessionsCountArgs {
  where?: Maybe<TestSessionDataArgs>;
}

export interface QueryTestArgs {
  testId: Scalars['String'];
}

export interface QueryVariationArgs {
  variationId: Scalars['String'];
}

export interface QueryVariationsArgs {
  testId: Scalars['String'];
}

export interface QueryVariationsCountArgs {
  testId: Scalars['String'];
}

export interface TestSessionDataArgs {
  id?: Maybe<Scalars['ID']>;
  diffImageKey?: Maybe<Scalars['String']>;
  imageKey?: Maybe<Scalars['String']>;
  misMatchPercentage?: Maybe<Scalars['Float']>;
  misMatchTolerance: Scalars['Float'];
  isSameDimensions?: Maybe<Scalars['Boolean']>;
  state: Scalars['String'];
  stateComment?: Maybe<Scalars['String']>;
  autoBaseline: Scalars['Boolean'];
}

export interface TestSessionType {
  __typename?: 'TestSessionType';
  id: Scalars['ID'];
  diffImageKey?: Maybe<Scalars['String']>;
  imageKey?: Maybe<Scalars['String']>;
  misMatchPercentage?: Maybe<Scalars['Float']>;
  misMatchTolerance: Scalars['Float'];
  isSameDimensions?: Maybe<Scalars['Boolean']>;
  state: Scalars['String'];
  stateComment?: Maybe<Scalars['String']>;
  autoBaseline: Scalars['Boolean'];
}

export interface TestType {
  __typename?: 'TestType';
  id: Scalars['ID'];
  name: Scalars['String'];
  project?: Maybe<ProjectType>;
  variations: Array<VariationType>;
}

export interface UpdateUserInput {
  email: Scalars['String'];
  forename?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
}

export interface User {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  forename?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  apiKey: Scalars['String'];
  active: Scalars['Boolean'];
}

export interface VariationType {
  __typename?: 'VariationType';
  id: Scalars['ID'];
  browserName: Scalars['String'];
  deviceName: Scalars['String'];
  additionalData?: Maybe<Scalars['JSON']>;
  baseline?: Maybe<TestSessionType>;
  testSessions: Array<TestSessionType>;
}
export interface CurrentUserQueryVariables {}

export type CurrentUserQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & UserDataFragment;
};

export interface SignupMutationVariables {
  email: Scalars['String'];
  password: Scalars['String'];
}

export type SignupMutation = { __typename?: 'Mutation' } & {
  signup: { __typename?: 'AuthPayload' } & {
    token: { __typename?: 'AuthToken' } & AuthTokenFragment;
    user: { __typename?: 'User' } & UserDataFragment;
  };
};

export interface LoginMutationVariables {
  email: Scalars['String'];
  password: Scalars['String'];
}

export type LoginMutation = { __typename?: 'Mutation' } & {
  signup: { __typename?: 'AuthPayload' } & {
    token: { __typename?: 'AuthToken' } & AuthTokenFragment;
    user: { __typename?: 'User' } & UserDataFragment;
  };
};

export type AuthTokenFragment = { __typename?: 'AuthToken' } & Pick<
  AuthToken,
  'expiresIn' | 'accessToken'
>;

export type UserDataFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'active' | 'email' | 'apiKey'
>;

export interface AllProjectsQueryVariables {}

export type AllProjectsQuery = { __typename?: 'Query' } & {
  projects: Array<{ __typename?: 'ProjectType' } & ProjectDataFragment>;
};

export interface AddProjectMutationVariables {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
}

export type AddProjectMutation = { __typename?: 'Mutation' } & {
  createProject: { __typename?: 'ProjectType' } & ProjectDataFragment;
};

export interface DeleteProjectMutationVariables {
  projectId: Scalars['String'];
}

export type DeleteProjectMutation = { __typename?: 'Mutation' } & {
  deleteProject: { __typename?: 'ProjectType' } & Pick<ProjectType, 'id'>;
};

export type ProjectDataFragment = { __typename?: 'ProjectType' } & Pick<
  ProjectType,
  'id' | 'name' | 'description'
>;

export interface GetVariationQueryVariables {
  variationId: Scalars['String'];
}

export type GetVariationQuery = { __typename?: 'Query' } & {
  variation: { __typename?: 'VariationType' } & VariationDataFragment;
};

export interface AllVariationsQueryVariables {
  testId: Scalars['String'];
}

export type AllVariationsQuery = { __typename?: 'Query' } & {
  variations: Array<{ __typename?: 'VariationType' } & VariationDataFragment>;
};

export interface DeleteVariationMutationVariables {
  id: Scalars['String'];
}

export type DeleteVariationMutation = { __typename?: 'Mutation' } & {
  deleteVariation: { __typename?: 'VariationType' } & Pick<VariationType, 'id'>;
};

export type VariationDataFragment = { __typename?: 'VariationType' } & Pick<
  VariationType,
  'id' | 'deviceName' | 'additionalData' | 'browserName'
> & {
    testSessions: Array<
      { __typename?: 'TestSessionType' } & Pick<
        TestSessionType,
        | 'id'
        | 'diffImageKey'
        | 'imageKey'
        | 'misMatchPercentage'
        | 'misMatchTolerance'
        | 'state'
        | 'stateComment'
        | 'autoBaseline'
      >
    >;
  };
export const AuthTokenFragmentDoc = gql`
  fragment AuthToken on AuthToken {
    expiresIn
    accessToken
  }
`;
export const UserDataFragmentDoc = gql`
  fragment UserData on User {
    id
    active
    email
    apiKey
  }
`;
export const ProjectDataFragmentDoc = gql`
  fragment ProjectData on ProjectType {
    id
    name
    description
  }
`;
export const VariationDataFragmentDoc = gql`
  fragment VariationData on VariationType {
    id
    deviceName
    additionalData
    browserName
    testSessions {
      id
      diffImageKey
      imageKey
      misMatchPercentage
      misMatchTolerance
      state
      stateComment
      autoBaseline
    }
  }
`;
export const CurrentUserDocument = gql`
  query currentUser {
    me {
      ...UserData
    }
  }
  ${UserDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class CurrentUserGQL extends Apollo.Query<
  CurrentUserQuery,
  CurrentUserQueryVariables
> {
  document = CurrentUserDocument;
}
export const SignupDocument = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token {
        ...AuthToken
      }
      user {
        ...UserData
      }
    }
  }
  ${AuthTokenFragmentDoc}
  ${UserDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class SignupGQL extends Apollo.Mutation<
  SignupMutation,
  SignupMutationVariables
> {
  document = SignupDocument;
}
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token {
        ...AuthToken
      }
      user {
        ...UserData
      }
    }
  }
  ${AuthTokenFragmentDoc}
  ${UserDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class LoginGQL extends Apollo.Mutation<
  LoginMutation,
  LoginMutationVariables
> {
  document = LoginDocument;
}
export const AllProjectsDocument = gql`
  query allProjects {
    projects {
      ...ProjectData
    }
  }
  ${ProjectDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class AllProjectsGQL extends Apollo.Query<
  AllProjectsQuery,
  AllProjectsQueryVariables
> {
  document = AllProjectsDocument;
}
export const AddProjectDocument = gql`
  mutation addProject($name: String!, $description: String) {
    createProject(data: { name: $name, description: $description }) {
      ...ProjectData
    }
  }
  ${ProjectDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class AddProjectGQL extends Apollo.Mutation<
  AddProjectMutation,
  AddProjectMutationVariables
> {
  document = AddProjectDocument;
}
export const DeleteProjectDocument = gql`
  mutation deleteProject($projectId: String!) {
    deleteProject(projectId: $projectId) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DeleteProjectGQL extends Apollo.Mutation<
  DeleteProjectMutation,
  DeleteProjectMutationVariables
> {
  document = DeleteProjectDocument;
}
export const GetVariationDocument = gql`
  query getVariation($variationId: String!) {
    variation(variationId: $variationId) {
      ...VariationData
    }
  }
  ${VariationDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class GetVariationGQL extends Apollo.Query<
  GetVariationQuery,
  GetVariationQueryVariables
> {
  document = GetVariationDocument;
}
export const AllVariationsDocument = gql`
  query allVariations($testId: String!) {
    variations(testId: $testId) {
      ...VariationData
    }
  }
  ${VariationDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class AllVariationsGQL extends Apollo.Query<
  AllVariationsQuery,
  AllVariationsQueryVariables
> {
  document = AllVariationsDocument;
}
export const DeleteVariationDocument = gql`
  mutation deleteVariation($id: String!) {
    deleteVariation(variationId: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DeleteVariationGQL extends Apollo.Mutation<
  DeleteVariationMutation,
  DeleteVariationMutationVariables
> {
  document = DeleteVariationDocument;
}
