import { questionsResponse, invalidTokenQuestionsResponse } from "../../../cypress/mocks/questions";

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(questionsResponse),
});

const mockFetchInvalidToken = () => Promise.resolve({
  json: () => Promise.resolve(invalidTokenQuestionsResponse),
});

export { mockFetch, mockFetchInvalidToken};
