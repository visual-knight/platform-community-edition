import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Use JavaScript Date object for date/time fields. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: AuthToken;
  user: User;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  expiresIn: Scalars['Int'];
  accessToken: Scalars['String'];
};

export type InvokeTestsession = {
  __typename?: 'InvokeTestsession';
  url: Scalars['String'];
  testSessionId: Scalars['String'];
};

export type Mutation = {
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
  invokeTestSession: InvokeTestsession;
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationSignupArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};

export type MutationChangePasswordArgs = {
  password: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type MutationInviteNewUserArgs = {
  email: Scalars['String'];
};

export type MutationCompleteInvitationArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type MutationCreateProjectArgs = {
  data: ProjectDataArgs;
};

export type MutationDeleteProjectArgs = {
  projectId: Scalars['String'];
};

export type MutationUpdateProjectArgs = {
  data: ProjectDataArgs;
  projectId: Scalars['String'];
};

export type MutationDeleteTestSessionArgs = {
  testSessionId: Scalars['String'];
};

export type MutationUpdateTestSessionArgs = {
  data: TestSessionDataArgs;
  testSessionId: Scalars['String'];
};

export type MutationDeleteTestArgs = {
  testId: Scalars['String'];
};

export type MutationDeleteVariationArgs = {
  variationId: Scalars['String'];
};

export type MutationInvokeTestSessionArgs = {
  autoBaseline: Scalars['Boolean'];
  capabilities: Scalars['JSON'];
  misMatchTolerance: Scalars['Float'];
  project: Scalars['String'];
  testname: Scalars['String'];
};

export type ProjectDataArgs = {
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
};

export type ProjectType = {
  __typename?: 'ProjectType';
  id: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type Query = {
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
  testSessionWatch?: Maybe<TestSessionComparison>;
};

export type QueryProjectArgs = {
  projectId: Scalars['String'];
};

export type QueryTestSessionArgs = {
  testSessionId: Scalars['String'];
};

export type QueryTestSessionsArgs = {
  where?: Maybe<TestSessionDataArgs>;
};

export type QueryTestSessionsCountArgs = {
  where?: Maybe<TestSessionDataArgs>;
};

export type QueryTestArgs = {
  testId: Scalars['String'];
};

export type QueryVariationArgs = {
  variationId: Scalars['String'];
};

export type QueryVariationsArgs = {
  testId: Scalars['String'];
};

export type QueryVariationsCountArgs = {
  testId: Scalars['String'];
};

export type QueryTestSessionWatchArgs = {
  testSessionId: Scalars['String'];
};

export type TestSessionComparison = {
  __typename?: 'TestSessionComparison';
  id: Scalars['ID'];
  diffImageKey?: Maybe<Scalars['String']>;
  imageKey?: Maybe<Scalars['String']>;
  misMatchPercentage?: Maybe<Scalars['Float']>;
  misMatchTolerance: Scalars['Float'];
  isSameDimensions?: Maybe<Scalars['Boolean']>;
  state: Scalars['String'];
  stateComment?: Maybe<Scalars['String']>;
  autoBaseline: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  link: Scalars['String'];
};

export type TestSessionDataArgs = {
  id?: Maybe<Scalars['ID']>;
  diffImageKey?: Maybe<Scalars['String']>;
  imageKey?: Maybe<Scalars['String']>;
  misMatchPercentage?: Maybe<Scalars['Float']>;
  misMatchTolerance: Scalars['Float'];
  isSameDimensions?: Maybe<Scalars['Boolean']>;
  state: Scalars['String'];
  stateComment?: Maybe<Scalars['String']>;
  autoBaseline: Scalars['Boolean'];
};

export type TestSessionType = {
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
  createdAt: Scalars['DateTime'];
};

export type TestType = {
  __typename?: 'TestType';
  id: Scalars['ID'];
  name: Scalars['String'];
  project?: Maybe<ProjectType>;
  variations: Array<VariationType>;
};

export type UpdateUserInput = {
  email: Scalars['String'];
  forename?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  forename?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  apiKey: Scalars['String'];
  active: Scalars['Boolean'];
};

export type VariationType = {
  __typename?: 'VariationType';
  id: Scalars['ID'];
  browserName: Scalars['String'];
  deviceName: Scalars['String'];
  createdAt: Scalars['DateTime'];
  additionalData?: Maybe<Scalars['JSON']>;
  baseline?: Maybe<TestSessionType>;
  testSessions: Array<TestSessionType>;
};
export type CurrentUserQueryVariables = {};

export type CurrentUserQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & UserDataFragment;
};

export type SignupMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignupMutation = { __typename?: 'Mutation' } & {
  signup: { __typename?: 'AuthPayload' } & {
    token: { __typename?: 'AuthToken' } & AuthTokenFragment;
    user: { __typename?: 'User' } & UserDataFragment;
  };
};

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'AuthPayload' } & {
    token: { __typename?: 'AuthToken' } & AuthTokenFragment;
    user: { __typename?: 'User' } & UserDataFragment;
  };
};

export type ForgotPasswordMutationVariables = {
  email: Scalars['String'];
};

export type ForgotPasswordMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'forgotPassword'
>;

export type ResetPasswordMutationVariables = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ResetPasswordMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'resetPassword'
>;

export type AuthTokenFragment = { __typename?: 'AuthToken' } & Pick<
  AuthToken,
  'expiresIn' | 'accessToken'
>;

export type UserDataFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'active' | 'email' | 'apiKey'
>;

export type AllProjectsQueryVariables = {};

export type AllProjectsQuery = { __typename?: 'Query' } & {
  projects: Array<{ __typename?: 'ProjectType' } & ProjectDataFragment>;
};

export type AddProjectMutationVariables = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type AddProjectMutation = { __typename?: 'Mutation' } & {
  createProject: { __typename?: 'ProjectType' } & ProjectDataFragment;
};

export type DeleteProjectMutationVariables = {
  projectId: Scalars['String'];
};

export type DeleteProjectMutation = { __typename?: 'Mutation' } & {
  deleteProject: { __typename?: 'ProjectType' } & Pick<ProjectType, 'id'>;
};

export type ProjectDataFragment = { __typename?: 'ProjectType' } & Pick<
  ProjectType,
  'id' | 'name' | 'description'
>;

export type AllTestsQueryVariables = {};

export type AllTestsQuery = { __typename?: 'Query' } & {
  tests: Array<{ __typename?: 'TestType' } & TestDataFragment>;
};

export type DeleteTestMutationVariables = {
  id: Scalars['String'];
};

export type DeleteTestMutation = { __typename?: 'Mutation' } & {
  deleteTest: { __typename?: 'TestType' } & Pick<TestType, 'id'>;
};

export type TestDataFragment = { __typename?: 'TestType' } & Pick<
  TestType,
  'id' | 'name'
> & {
    project: Maybe<{ __typename?: 'ProjectType' } & Pick<ProjectType, 'id'>>;
    variations: Array<
      { __typename?: 'VariationType' } & Pick<
        VariationType,
        'id' | 'createdAt' | 'browserName' | 'deviceName'
      > & {
          testSessions: Array<
            { __typename?: 'TestSessionType' } & Pick<
              TestSessionType,
              'id' | 'state'
            >
          >;
        }
    >;
  };

export type GetVariationQueryVariables = {
  variationId: Scalars['String'];
};

export type GetVariationQuery = { __typename?: 'Query' } & {
  variation: { __typename?: 'VariationType' } & VariationDataFragment;
};

export type AllVariationsQueryVariables = {
  testId: Scalars['String'];
};

export type AllVariationsQuery = { __typename?: 'Query' } & {
  variations: Array<{ __typename?: 'VariationType' } & VariationDataFragment>;
};

export type DeleteVariationMutationVariables = {
  id: Scalars['String'];
};

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
        | 'createdAt'
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
export const TestDataFragmentDoc = gql`
  fragment TestData on TestType {
    id
    name
    project {
      id
    }
    variations {
      id
      createdAt
      browserName
      deviceName
      testSessions {
        id
        state
      }
    }
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
      createdAt
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
    login(email: $email, password: $password) {
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
export const ForgotPasswordDocument = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordGQL extends Apollo.Mutation<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
> {
  document = ForgotPasswordDocument;
}
export const ResetPasswordDocument = gql`
  mutation resetPassword($password: String!, $token: String!) {
    resetPassword(token: $token, password: $password)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGQL extends Apollo.Mutation<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
> {
  document = ResetPasswordDocument;
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
export const AllTestsDocument = gql`
  query allTests {
    tests {
      ...TestData
    }
  }
  ${TestDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class AllTestsGQL extends Apollo.Query<
  AllTestsQuery,
  AllTestsQueryVariables
> {
  document = AllTestsDocument;
}
export const DeleteTestDocument = gql`
  mutation deleteTest($id: String!) {
    deleteTest(testId: $id) {
      id
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DeleteTestGQL extends Apollo.Mutation<
  DeleteTestMutation,
  DeleteTestMutationVariables
> {
  document = DeleteTestDocument;
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
