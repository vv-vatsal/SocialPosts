import { Alert } from "react-native";

const BASE_URL = "https://dummyjson.com/"; // Set the base URL here

interface FetchOptions extends RequestInit {
  body?: any; // Allow raw body or stringified JSON
}

export const doFetch = async <T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  // Construct the full URL by combining the base URL with the passed URL
  const fullUrl = `${BASE_URL}${url}`;

  console.log(
    `%cRequest: ${options.method || "GET"} ${fullUrl}`,
    "color: blue; font-weight: bold;",
    options
  );

  try {
    // Automatically stringify body if it's an object
    if (options.body && typeof options.body === "object") {
      options.body = JSON.stringify(options.body);
      options.headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      };
    }

    const response = await fetch(fullUrl, options);

    // Check for HTTP errors
    if (!response.ok) {
      const error = await response.json();
      console.error(
        `%cError: ${response.status} ${response.statusText}`,
        "color: red; font-weight: bold;",
        error
      );
      throw new Error(error.message || `Error ${response.status}: ${response.statusText}`);
    }

    const data: T = await response.json();
    console.log(`%cResponse:`, "color: green; font-weight: bold;", data);
    return data;
  } catch (error: any) {
    console.error(`%cFetch Error:`, "color: red; font-weight: bold;", error);
    Alert.alert("Error", error.message || "Something went wrong");
    throw error;
  }
};
