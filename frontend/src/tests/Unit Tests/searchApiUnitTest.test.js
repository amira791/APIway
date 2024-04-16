import axios from 'axios';
import { renderHook } from '@testing-library/react-hooks';
import useApi from '../../hooks/ApiHook';

// Mock axios
jest.mock('axios');

test('fetchApiSearchResults fetches correct search results when searching for "car"', async () => {
  // Mock API response for search
  const mockSearchResponse = {
    data: [
      { id: 1, api_name: 'Cars News API', description: 'api about cars news' }
    ]
  };

  // Mock the axios get method
  axios.get.mockResolvedValueOnce({ data: [] }); // Mock for the first useEffect
  axios.get.mockResolvedValueOnce({ data: [] }); // Mock for the second useEffect
  axios.post.mockResolvedValueOnce(mockSearchResponse); // Mock for fetchApiSearchResults

  // Render the hook
  const { result, waitForNextUpdate } = renderHook(() => useApi());

  // Call fetchApiSearchResults with query 'car'
  result.current.fetchApiSearchResults({ query: 'car', filter: 'Name', category: null, page: 1 });

  // Wait for search results to be updated
  await waitForNextUpdate();

  // Assert that the correct API is in the search results
  expect(result.current.searchResults).toEqual([{ id: 1, api_name: 'Cars News API', description: 'api about cars news' }]);
});
