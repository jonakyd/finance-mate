import {
  vi,
  describe,
  it,
  expect,
  type MockInstance,
  beforeAll,
  afterAll,
} from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import { getApiService } from "./api-service";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("getApiService()", () => {
  let fetchSpy: MockInstance<typeof fetch>;
  let localStorageSpy: MockInstance<typeof Storage.prototype.getItem>;
  let apiService: ReturnType<typeof getApiService>;

  beforeAll(() => {
    fetchSpy = vi
      .spyOn(window, "fetch")
      .mockName("mocked fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ data: [1, 2, 3] }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );
    localStorageSpy = vi
      .spyOn(Storage.prototype, "getItem")
      .mockName("mocked localStorage")
      .mockReturnValue("my-secret-token");
    apiService = getApiService();
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it("should attach the auth header if token exists in localStorage", async () => {
    const { result } = renderHook(
      () =>
        apiService.useQuery("get", "/users/{id}", {
          params: { path: { id: "123" } },
        }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isFetching).toBe(false));
    const req = fetchSpy.mock.lastCall?.[0] as Request;
    expect(req.headers.get("X-Authentication")).toBe("my-secret-token");
  });

  it("should not attach the auth header if token does not exist", async () => {
    localStorageSpy.mockReturnValue(null);
    const { result } = renderHook(
      () =>
        apiService.useQuery("get", "/users/{id}", {
          params: { path: { id: "123" } },
        }),
      { wrapper },
    );

    await waitFor(() => expect(result.current.isFetching).toBe(false));

    const req = fetchSpy.mock.lastCall?.[0] as Request;
    expect(req.headers.get("X-Authentication")).toBe(null);
  });
});
