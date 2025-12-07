import createFetchClient from "openapi-fetch";
import createClient from "openapi-react-query";
import type {
  PathsWithMethod,
  ErrorResponseJSON,
} from "openapi-typescript-helpers";
import type { paths } from "./schema";
import { Modal } from "antd";

let apiService: ReturnType<typeof createApiService>;

const defaultHandleError = (title: string, content?: string) => {
  Modal.error({ title, content });
};

const createApiService = (
  baseUrl: string,
  logoutUrl: string,
  handleError = defaultHandleError,
) => {
  const fetchClient = createFetchClient<paths>({ baseUrl });

  fetchClient.use({
    onRequest({ request }) {
      const token = localStorage.getItem("token");

      if (token) {
        request.headers.set("X-Authentication", token);
      }
      return request;
    },

    onResponse({ request, response }) {
      // Noop for 2xx responses
      if (response.ok) {
        return;
      }

      // Handle non-2xx responses
      if (request.method === "GET") {
        const content = response.json() as ErrorResponseJSON<
          paths[PathsWithMethod<paths, "get">]["get"]
        >;

        if (content.message === "UNAUTHORIZED") {
          location.href = logoutUrl;
          return;
        }
        if (content.message === "FORBIDDEN") {
          handleError(
            "Access Denied",
            "You do not have permission to access this resource.",
          );
          return;
        }
      }
    },

    onError({ error }) {
      // Handle global exceptions
      if (error instanceof DOMException) {
        // Ignore abort errors (usually from cancellations)
        if (error.name === "AbortError") {
          return;
        }
      }
      if (error instanceof TypeError) {
        // Likely a network error
      }

      // Log the error
      console.error("Global error handler:", error);
    },
  });
  return createClient(fetchClient);
};

export const getApiService = () => {
  if (!apiService) {
    apiService = createApiService("apt.com", "/logout");
  }
  return apiService;
};
