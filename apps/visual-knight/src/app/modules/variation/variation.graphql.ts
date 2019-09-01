import gql from 'graphql-tag';
import { Variation } from '@generated/photonjs';

const variationFragment = gql`
  fragment VariationData on Variation {
    id
    deviceName
    additionalData
    baselineVariationRef {
      imageKey
      id
    }
    browserName
    testSessions(orderBy: createdAt_DESC) {
      id
      diffImageKey
      baselineRef {
        id
      }
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
  }
`;

export const variationQuery = gql`
  query getVariation($variationId: ID!) {
    variation(where: { id: $variationId }) {
      ...VariationData
    }
  }
  ${variationFragment}
`;

export const variationListQuery = gql`
  query allVariations($testId: ID!) {
    variations(where: { test: { id: $testId } }) {
      ...VariationData
    }
  }
  ${variationFragment}
`;

export const deleteVariationMutation = gql`
  mutation deleteVariation($id: ID!) {
    deleteVariation(where: { id: $id }) {
      id
    }
  }
`;
export interface DeleteVariationResponse {
  deleteVariation: { id: string };
}

export interface VariationQueryResponse {
  variation: Variation;
}

export interface VariationListQueryResponse {
  variations: Variation[];
}
