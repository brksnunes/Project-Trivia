import { questionsResponse } from "../../../cypress/mocks/questions";

const mockFetch = () => Promise.resolve({
  json: () => Promise.resolve(questionsResponse),
});

export default mockFetch;
