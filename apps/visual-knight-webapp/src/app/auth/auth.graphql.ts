import gql from 'graphql-tag';

const UserInfoFragment = gql`
  fragment UserInfoFragment on User {
    id
    active
    forename
    lastname
    email
    contractUserOwner {
      id
    }
    contractUser {
      id
      planStripeId
    }
    role
  }
`;

export const refreshTokenMutation = gql`
  mutation token($refreshToken: String!) {
    token(refreshToken: $refreshToken)
  }
`;

export const signinMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      refreshToken
    }
  }
`;

export const signupMutation = gql`
  mutation signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      user {
        ...UserInfoFragment
      }
      token
      refreshToken
    }
  }
  ${UserInfoFragment}
`;

export const currentUserQuery = gql`
  query {
    me {
      ...UserInfoFragment
    }
  }
  ${UserInfoFragment}
`;

export const verifyEmailMutation = gql`
  mutation verifyEmail($token: String!) {
    verifyEmail(token: $token)
  }
`;

export const completeInvitationMutation = gql`
  mutation completeInvitation($token: String!, $password: String!) {
    completeInvitation(token: $token, password: $password) {
      user {
        email
        id
      }
      token
      refreshToken
    }
  }
`;

export const resetPasswordMutation = gql`
  mutation resetPassword($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`;

export const forgotPasswordMutation = gql`
  mutation forgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const userVerificationSubscription = gql`
  subscription {
    user {
      node {
        active
      }
    }
  }
`;
