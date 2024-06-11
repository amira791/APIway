/* import { renderHook, act } from '@testing-library/react-hooks';
import API from '../../API';
import useUnite from './useUnite';

jest.mock('../../API');

const mockAPIResponse = (url, data, status = 200) => {
  API.post.mockImplementationOnce((endpoint, requestData) => {
    if (endpoint === url) {
      return Promise.resolve({ data, status });
    }
    return Promise.reject(new Error('API not found'));
  });
  API.get.mockImplementationOnce((endpoint) => {
    if (endpoint === url) {
      return Promise.resolve({ data, status });
    }
    return Promise.reject(new Error('API not found'));
  });
};

describe('useUnite Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a new API successfully', async () => {
    const { result } = renderHook(() => useUnite());

    const formData = {
      apiName: 'Test API',
      description: 'Test Description',
      termOfUse: 'Test Terms',
      logo: 'test-logo.png',
      visibility: 'public',
      providerId: 1,
      categoryId: 1,
      website: 'http://testapi.com'
    };
    const functionalities = ['Functionality 1', 'Functionality 2'];
    const baseLinks = ['http://baseLink1.com', 'http://baseLink2.com'];
    const endpoints = [
      {
        name: 'Endpoint 1',
        method: 'GET',
        path: '/endpoint1',
        description: 'Test endpoint 1',
        group: 'Group 1',
        params: [{ name: 'param1', type: 'string', value: 'value1', required: true }],
        headers: [{ key: 'header1', value: 'value1', required: true }],
        queryParams: [{ key: 'query1', type: 'string', value: 'value1', required: true }],
        body: { mediaType: 'application/json', payloadName: 'payload1', payloadValue: 'value1', bodyExample: '{}' },
        responseExamples: [{ codeStatus: 200, exampleName: 'Success', responseBody: '{}' }]
      }
    ];
    const Models = [
      {
        Name: 'Model 1',
        Period: 'Monthly',
        Description: 'Model 1 description',
        plans: [{ price: 10, features: 'Feature 1', quotalimit: 1000, ratelimit: 1000, id: 1 }]
      }
    ];

    mockAPIResponse('/apis/', { id_api: 1 });
    mockAPIResponse('/pricing_model/', { id_model: 1 });
    mockAPIResponse('/tarifications/', { id_tarif: 1 });
    mockAPIResponse('/functionnalities/', { id_funct: 1 });
    mockAPIResponse('/baselink/', { baselink_id: 1 });
    mockAPIResponse('/apiversions/', { id_version: 1 });
    mockAPIResponse('/apiendpoints/', { id_endpoint: 1 });
    mockAPIResponse('/apiheaders/', {});
    mockAPIResponse('/apiquery/', {});
    mockAPIResponse('/apiendpointbody/', {});
    mockAPIResponse('/endpoint_parameter/', {});
    mockAPIResponse('/responseexample/', {});

    await act(async () => {
      await result.current.addNewAPI(formData, functionalities, baseLinks, endpoints, Models);
    });

    expect(API.post).toHaveBeenCalledTimes(12); // Number of API calls made
    expect(API.post).toHaveBeenCalledWith('/apis/', expect.any(Object), expect.any(Object));
    expect(API.post).toHaveBeenCalledWith('/pricing_model/', expect.any(Object), expect.any(Object));
    expect(API.post).toHaveBeenCalledWith('/tarifications/', expect.any(Object), expect.any(Object));
    expect(API.post).toHaveBeenCalledWith('/functionnalities/', { functName: 'Functionality 1' });
    expect(API.post).toHaveBeenCalledWith('/baselink/', { url: 'http://baseLink1.com' });
    expect(API.post).toHaveBeenCalledWith('/apiversions/', expect.any(Object));
    expect(API.post).toHaveBeenCalledWith('/apiendpoints/', expect.any(Object));
    expect(API.post).toHaveBeenCalledWith('/apiheaders/', expect.any(Object));
    expect(API.post).toHaveBeenCalledWith('/apiquery/', expect.any(Object));
    expect(API.post).toHaveBeenCalledWith('/apiendpointbody/', expect.any(Object));
    expect(API.post).toHaveBeenCalledWith('/endpoint_parameter/', expect.any(Object));
    expect(API.post).toHaveBeenCalledWith('/responseexample/', expect.any(Object));
  });

  it('should fetch API details by ID', async () => {
    const { result } = renderHook(() => useUnite());

    mockAPIResponse('/apis/1/', { id_api: 1, api_name: 'Test API' });

    let apiDetails;
    await act(async () => {
      apiDetails = await result.current.fetchAPIDetailsById(1);
    });

    expect(apiDetails).toEqual({ id_api: 1, api_name: 'Test API' });
    expect(API.get).toHaveBeenCalledWith('/apis/1/');
  });

  it('should fetch API category by ID', async () => {
    const { result } = renderHook(() => useUnite());

    mockAPIResponse('/apicategories/1/', { id_category: 1, label: 'Test Category' });

    let categoryDetails;
    await act(async () => {
      categoryDetails = await result.current.fetchAPICategorysById(1);
    });

    expect(categoryDetails).toEqual({ id_category: 1, label: 'Test Category' });
    expect(API.get).toHaveBeenCalledWith('/apicategories/1/');
  });

  it('should fetch API provider by ID', async () => {
    const { result } = renderHook(() => useUnite());

    mockAPIResponse('/fournisseurs/1/', { id_provider: 1, name: 'Test Provider' });

    let providerDetails;
    await act(async () => {
      providerDetails = await result.current.fetchAPIProviderById(1);
    });

    expect(providerDetails).toEqual({ id_provider: 1, name: 'Test Provider' });
    expect(API.get).toHaveBeenCalledWith('/fournisseurs/1/');
  });

  it('should fetch all API versions by ID', async () => {
    const { result } = renderHook(() => useUnite());

    mockAPIResponse('/apiversions/', [
      { id_version: 1, api: 1, state: 'Active' },
      { id_version: 2, api: 1, state: 'Draft' }
    ]);

    let apiVersions;
    await act(async () => {
      apiVersions = await result.current.fetchAllAPIVersionsById(1);
    });

    expect(apiVersions).toEqual([{ id_version: 1, api: 1, state: 'Active' }]);
    expect(API.get).toHaveBeenCalledWith('/apiversions/');
  });

  it('should fetch API versions info by ID', async () => {
    const { result } = renderHook(() => useUnite());

    mockAPIResponse('/apiversions/1/', { id_version: 1, num_version: '1' });

    let apiVersionInfo;
    await act(async () => {
      apiVersionInfo = await result.current.fetchAPIVersionsInfoById(1);
    });

    expect(apiVersionInfo).toEqual({ id_version: 1, num_version: '1' });
    expect(API.get).toHaveBeenCalledWith('/apiversions/1/');
  });

  it('should fetch API endpoints by version', async () => {
    const { result } = renderHook(() => useUnite());

    mockAPIResponse('/apiendpoints/', [
      { id_endpoint: 1, version: 1, title: 'Test Endpoint' }
    ]);

    let endpoints;
    await act(async () => {
      endpoints = await result.current.fetchAPIEndpointsByVersion(1);
    });

    expect(endpoints).toEqual([{ id_endpoint: 1, version: 1, title: 'Test Endpoint' }]);
    expect(API.get).toHaveBeenCalledWith('/apiendpoints/');
  });

  it('should fetch API headers by endpoint ID', async () => {
    const { result } = renderHook(() => useUnite());

    mockAPIResponse('/apiheaders/', [
      { id_header: 1, endpoint: 1, key: 'header1', value: 'value1' }
    ]);

    let headers;
    await act(async () => {
      headers = await result.current.fetchAPIHeadersByEndpointId(1);
    });

    expect(headers).toEqual([{ id_header: 1, endpoint: 1, key: 'header1', value: 'value1' }]);
    expect(API.get).toHaveBeenCalledWith('/apiheaders/');
  });

  it('should fetch API query params by endpoint ID', async () => {
    const { result } = renderHook(() => useUnite());

    mockAPIResponse('/apiquery/', [
      { id_query: 1, endpoint: 1, key: 'query1', value: 'value1' }
    ]);

    let queryParams;
    await act(async () => {
      queryParams = await result.current.fetchAPIQueryParamsByEndpointId(1);
    });

    expect(queryParams).toEqual([{ id_query: 1, endpoint: 1, key: 'query1', value: 'value1' }]);
    expect(API.get).toHaveBeenCalledWith('/apiquery/');
  });

  it('should fetch API response examples by endpoint ID', async () => {
    const { result } = renderHook(() => useUnite());

    mockAPIResponse('/responseexample/', [
      { id_response: 1, endpoint: 1, codeStatus: 200, exampleName: 'Success' }
    ]);

    let responseExamples;
    await act(async () => {
      responseExamples = await result.current.fetchAPIResponseExamplesByEndpointId(1);
    });

    expect(responseExamples).toEqual([{ id_response: 1, endpoint: 1, codeStatus: 200, exampleName: 'Success' }]);
    expect(API.get).toHaveBeenCalledWith('/responseexample/');
  });

  it('should fetch API endpoint body by endpoint ID', async () => {
    const { result } = renderHook(() => useUnite());

    mockAPIResponse('/apiendpointbody/', [
      { id_body: 1, endpoint: 1, mediaType: 'application/json' }
    ]);

    let bodyInfo;
    await act(async () => {
      bodyInfo = await result.current.fetchAPIEndpointBodyByEndpointId(1);
    });

    expect(bodyInfo).toEqual([{ id_body: 1, endpoint: 1, mediaType: 'application/json' }]);
    expect(API.get).toHaveBeenCalledWith('/apiendpointbody/');
  });
});
 */