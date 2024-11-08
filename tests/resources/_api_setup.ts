import { vi } from 'vitest';

export function mockApiMethods() {
  return {
    Api: vi.fn().mockReturnValue({
      getResources: vi.fn(),
      callResource: vi.fn(),
      deleteResource: vi.fn(),
      callAsyncRequest: vi.fn(),
      callAsyncRequests: vi.fn(),
      callSummary: vi.fn(),
      downloadResource: vi.fn(),
      uploadMultipart: vi.fn(),
      _parseApiResponse: vi.fn(),
      _getResource: vi.fn(),
      getToken: vi.fn(),
      exchangeCodeForToken: vi.fn(),
      refreshToken: vi.fn(),
    })
  };
}