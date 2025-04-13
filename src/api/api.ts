const URL = 'https://api.thecatapi.com/v1';

export interface RandomCatResponse {
  id: string;
  url: string;
  width: string;
  height: string;
}

export const fetchRandomCat = async (): Promise<RandomCatResponse> => {
  const response = await fetch(URL + '/images/search');
  const data: RandomCatResponse[] = await response.json();
  return data[0];
};
