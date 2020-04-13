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
  user: UserType;
};

export type AuthToken = {
  __typename?: 'AuthToken';
  expiresIn: Scalars['Int'];
  accessToken: Scalars['String'];
};

export type IgnoreAreaType = {
  __typename?: 'IgnoreAreaType';
  x: Scalars['Float'];
  y: Scalars['Float'];
  width: Scalars['Float'];
  height: Scalars['Float'];
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
  deleteUser: UserType;
  updateUser: UserType;
  inviteNewUser: UserType;
  resendInvitationMail: Scalars['Boolean'];
  completeInvitation: AuthPayload;
  createProject: ProjectType;
  deleteProject: ProjectType;
  updateProject: ProjectType;
  deleteTestSession: TestSessionType;
  updateTestSession: TestSessionType;
  declineTestSession: TestSessionType;
  deleteTest: TestType;
  deleteVariation: VariationType;
  acceptNewBaseline: VariationType;
  invokeTestSession: Scalars['String'];
  uploadScreenshot?: Maybe<TestSessionComparison>;
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

export type MutationResendInvitationMailArgs = {
  userId: Scalars['String'];
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

export type MutationDeclineTestSessionArgs = {
  comment?: Maybe<Scalars['String']>;
  testSessionId: Scalars['String'];
};

export type MutationDeleteTestArgs = {
  testId: Scalars['String'];
};

export type MutationDeleteVariationArgs = {
  variationId: Scalars['String'];
};

export type MutationAcceptNewBaselineArgs = {
  comment?: Maybe<Scalars['String']>;
  testSessionId: Scalars['String'];
  variationId: Scalars['String'];
};

export type MutationInvokeTestSessionArgs = {
  autoBaseline: Scalars['Boolean'];
  capabilities: Scalars['JSON'];
  misMatchTolerance: Scalars['Float'];
  project: Scalars['String'];
  testname: Scalars['String'];
};

export type MutationUploadScreenshotArgs = {
  testSessionId: Scalars['String'];
  base64Image: Scalars['String'];
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
  me: UserType;
  users: Array<UserType>;
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
  selectedTestSession: Scalars['ID'];
  selectedTest: Scalars['ID'];
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
  stateChangedByUser?: Maybe<UserType>;
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
  stateChangedByUser?: Maybe<UserType>;
  isSuccessful: Scalars['Boolean'];
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

export type UserType = {
  __typename?: 'UserType';
  id: Scalars['ID'];
  email: Scalars['String'];
  forename?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  apiKey: Scalars['String'];
  active: Scalars['Boolean'];
  role: Scalars['String'];
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
  ignoreAreas?: Maybe<Array<IgnoreAreaType>>;
  isLastSuccessful: Scalars['Boolean'];
};
export type VerifyEmailMutationVariables = {
  token: Scalars['String'];
};

export type VerifyEmailMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'verifyEmail'
>;

export type CompleteInvitationMutationVariables = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type CompleteInvitationMutation = { __typename?: 'Mutation' } & {
  completeInvitation: { __typename?: 'AuthPayload' } & {
    token: { __typename?: 'AuthToken' } & Pick<AuthToken, 'accessToken'>;
    user: { __typename?: 'UserType' } & UserDataFragment;
  };
};

export type CurrentUserQueryVariables = {};

export type CurrentUserQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'UserType' } & UserDataFragment;
};

export type SignupMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignupMutation = { __typename?: 'Mutation' } & {
  signup: { __typename?: 'AuthPayload' } & {
    token: { __typename?: 'AuthToken' } & AuthTokenFragment;
    user: { __typename?: 'UserType' } & UserDataFragment;
  };
};

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'AuthPayload' } & {
    token: { __typename?: 'AuthToken' } & AuthTokenFragment;
    user: { __typename?: 'UserType' } & UserDataFragment;
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

export type UserDataFragment = { __typename?: 'UserType' } & Pick<
  UserType,
  'id' | 'email' | 'forename' | 'lastname' | 'active' | 'apiKey' | 'role'
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

export type SelectedTestQueryVariables = {};

export type SelectedTestQuery = { __typename?: 'Query' } & Pick<
  Query,
  'selectedTest'
>;

export type UserlistQueryVariables = {};

export type UserlistQuery = { __typename?: 'Query' } & {
  users: Array<{ __typename?: 'UserType' } & UserDataFragment>;
};

export type UpdateProfileMutationVariables = {
  email: Scalars['String'];
  forename?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
};

export type UpdateProfileMutation = { __typename?: 'Mutation' } & {
  updateUser: { __typename?: 'UserType' } & UserDataFragment;
};

export type SetNewPasswordMutationVariables = {
  password: Scalars['String'];
};

export type SetNewPasswordMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'changePassword'
>;

export type ResendVerificationEmailMutationVariables = {};

export type ResendVerificationEmailMutation = {
  __typename?: 'Mutation';
} & Pick<Mutation, 'resendVerifyEmail'>;

export type ResendInvitationMailMutationVariables = {
  userId: Scalars['String'];
};

export type ResendInvitationMailMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'resendInvitationMail'
>;

export type AddUserMutationVariables = {
  email: Scalars['String'];
};

export type AddUserMutation = { __typename?: 'Mutation' } & {
  inviteNewUser: { __typename?: 'UserType' } & UserDataFragment;
};

export type DeleteUserMutationVariables = {
  id: Scalars['String'];
};

export type DeleteUserMutation = { __typename?: 'Mutation' } & {
  deleteUser: { __typename?: 'UserType' } & UserDataFragment;
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

export type AcceptNewBaselineMutationVariables = {
  testSessionId: Scalars['String'];
  variationId: Scalars['String'];
  comment?: Maybe<Scalars['String']>;
};

export type AcceptNewBaselineMutation = { __typename?: 'Mutation' } & {
  acceptNewBaseline: { __typename?: 'VariationType' } & VariationDataFragment;
};

export type DeclineTestSessionMutationVariables = {
  testSessionId: Scalars['String'];
  comment?: Maybe<Scalars['String']>;
};

export type DeclineTestSessionMutation = { __typename?: 'Mutation' } & {
  declineTestSession: {
    __typename?: 'TestSessionType';
  } & TestSessionDataFragment;
};

export type VariationDataFragment = { __typename?: 'VariationType' } & Pick<
  VariationType,
  'id' | 'deviceName' | 'additionalData' | 'browserName' | 'isLastSuccessful'
> & {
    baseline: Maybe<
      { __typename?: 'TestSessionType' } & Pick<
        TestSessionType,
        'imageKey' | 'id'
      >
    >;
    testSessions: Array<
      { __typename?: 'TestSessionType' } & TestSessionDataFragment
    >;
    ignoreAreas: Maybe<
      Array<{ __typename?: 'IgnoreAreaType' } & IgnoreAreaDataFragment>
    >;
  };

export type IgnoreAreaDataFragment = { __typename?: 'IgnoreAreaType' } & Pick<
  IgnoreAreaType,
  'x' | 'y' | 'height' | 'width'
>;

export type TestSessionDataFragment = { __typename?: 'TestSessionType' } & Pick<
  TestSessionType,
  | 'id'
  | 'diffImageKey'
  | 'isSuccessful'
  | 'imageKey'
  | 'misMatchPercentage'
  | 'misMatchTolerance'
  | 'createdAt'
  | 'state'
  | 'stateComment'
  | 'autoBaseline'
> & {
    stateChangedByUser: Maybe<
      { __typename?: 'UserType' } & Pick<
        UserType,
        'forename' | 'lastname' | 'email'
      >
    >;
  };

export type SelectedTestSessionQueryVariables = {};

export type SelectedTestSessionQuery = { __typename?: 'Query' } & Pick<
  Query,
  'selectedTestSession'
>;

export type GetTestNameQueryVariables = {
  testId: Scalars['String'];
};

export type GetTestNameQuery = { __typename?: 'Query' } & {
  test: { __typename?: 'TestType' } & Pick<TestType, 'name'>;
};
export const AuthTokenFragmentDoc = gql`
  fragment AuthToken on AuthToken {
    expiresIn
    accessToken
  }
`;
export const UserDataFragmentDoc = gql`
  fragment UserData on UserType {
    id
    email
    forename
    lastname
    active
    apiKey
    role
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
export const TestSessionDataFragmentDoc = gql`
  fragment TestSessionData on TestSessionType {
    id
    diffImageKey
    isSuccessful @client
    imageKey
    misMatchPercentage
    misMatchTolerance
    createdAt
    state
    stateComment
    autoBaseline
    stateChangedByUser {
      forename
      lastname
      email
    }
  }
`;
export const IgnoreAreaDataFragmentDoc = gql`
  fragment IgnoreAreaData on IgnoreAreaType {
    x
    y
    height
    width
  }
`;
export const VariationDataFragmentDoc = gql`
  fragment VariationData on VariationType {
    id
    deviceName
    additionalData
    baseline {
      imageKey
      id
    }
    browserName
    isLastSuccessful @client
    testSessions {
      ...TestSessionData
    }
    ignoreAreas {
      ...IgnoreAreaData
    }
  }
  ${TestSessionDataFragmentDoc}
  ${IgnoreAreaDataFragmentDoc}
`;
export const VerifyEmailDocument = gql`
  mutation verifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailGQL extends Apollo.Mutation<
  VerifyEmailMutation,
  VerifyEmailMutationVariables
> {
  document = VerifyEmailDocument;
}
export const CompleteInvitationDocument = gql`
  mutation completeInvitation($password: String!, $token: String!) {
    completeInvitation(password: $password, token: $token) {
      token {
        accessToken
      }
      user {
        ...UserData
      }
    }
  }
  ${UserDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class CompleteInvitationGQL extends Apollo.Mutation<
  CompleteInvitationMutation,
  CompleteInvitationMutationVariables
> {
  document = CompleteInvitationDocument;
}
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
export const SelectedTestDocument = gql`
  query selectedTest {
    selectedTest @client
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SelectedTestGQL extends Apollo.Query<
  SelectedTestQuery,
  SelectedTestQueryVariables
> {
  document = SelectedTestDocument;
}
export const UserlistDocument = gql`
  query userlist {
    users {
      ...UserData
    }
  }
  ${UserDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class UserlistGQL extends Apollo.Query<
  UserlistQuery,
  UserlistQueryVariables
> {
  document = UserlistDocument;
}
export const UpdateProfileDocument = gql`
  mutation updateProfile(
    $email: String!
    $forename: String
    $lastname: String
  ) {
    updateUser(
      data: { forename: $forename, lastname: $lastname, email: $email }
    ) {
      ...UserData
    }
  }
  ${UserDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class UpdateProfileGQL extends Apollo.Mutation<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
> {
  document = UpdateProfileDocument;
}
export const SetNewPasswordDocument = gql`
  mutation setNewPassword($password: String!) {
    changePassword(password: $password)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SetNewPasswordGQL extends Apollo.Mutation<
  SetNewPasswordMutation,
  SetNewPasswordMutationVariables
> {
  document = SetNewPasswordDocument;
}
export const ResendVerificationEmailDocument = gql`
  mutation resendVerificationEmail {
    resendVerifyEmail
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ResendVerificationEmailGQL extends Apollo.Mutation<
  ResendVerificationEmailMutation,
  ResendVerificationEmailMutationVariables
> {
  document = ResendVerificationEmailDocument;
}
export const ResendInvitationMailDocument = gql`
  mutation resendInvitationMail($userId: String!) {
    resendInvitationMail(userId: $userId)
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ResendInvitationMailGQL extends Apollo.Mutation<
  ResendInvitationMailMutation,
  ResendInvitationMailMutationVariables
> {
  document = ResendInvitationMailDocument;
}
export const AddUserDocument = gql`
  mutation addUser($email: String!) {
    inviteNewUser(email: $email) {
      ...UserData
    }
  }
  ${UserDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class AddUserGQL extends Apollo.Mutation<
  AddUserMutation,
  AddUserMutationVariables
> {
  document = AddUserDocument;
}
export const DeleteUserDocument = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      ...UserData
    }
  }
  ${UserDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class DeleteUserGQL extends Apollo.Mutation<
  DeleteUserMutation,
  DeleteUserMutationVariables
> {
  document = DeleteUserDocument;
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
export const AcceptNewBaselineDocument = gql`
  mutation acceptNewBaseline(
    $testSessionId: String!
    $variationId: String!
    $comment: String
  ) {
    acceptNewBaseline(
      variationId: $variationId
      testSessionId: $testSessionId
      comment: $comment
    ) {
      ...VariationData
    }
  }
  ${VariationDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class AcceptNewBaselineGQL extends Apollo.Mutation<
  AcceptNewBaselineMutation,
  AcceptNewBaselineMutationVariables
> {
  document = AcceptNewBaselineDocument;
}
export const DeclineTestSessionDocument = gql`
  mutation declineTestSession($testSessionId: String!, $comment: String) {
    declineTestSession(testSessionId: $testSessionId, comment: $comment) {
      ...TestSessionData
    }
  }
  ${TestSessionDataFragmentDoc}
`;

@Injectable({
  providedIn: 'root'
})
export class DeclineTestSessionGQL extends Apollo.Mutation<
  DeclineTestSessionMutation,
  DeclineTestSessionMutationVariables
> {
  document = DeclineTestSessionDocument;
}
export const SelectedTestSessionDocument = gql`
  query selectedTestSession {
    selectedTestSession @client
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SelectedTestSessionGQL extends Apollo.Query<
  SelectedTestSessionQuery,
  SelectedTestSessionQueryVariables
> {
  document = SelectedTestSessionDocument;
}
export const GetTestNameDocument = gql`
  query getTestName($testId: String!) {
    test(testId: $testId) {
      name
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class GetTestNameGQL extends Apollo.Query<
  GetTestNameQuery,
  GetTestNameQueryVariables
> {
  document = GetTestNameDocument;
}
