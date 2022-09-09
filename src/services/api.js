export default async function getToken() {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  try {
    const data = await fetch(URL);
    const response = await data.json();
    return response.token;
  } catch (error) {
    return error;
  }
}

export async function getQuestionsAPI(token) {
  const URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  try {
    const data = await fetch(URL);
    const response = await data.json();
    return response;
  } catch (error) {
    return error;
  }
}
