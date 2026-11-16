import { HttpError } from "./HttpError.js";
export async function searchCountries(query: string, signal: AbortSignal) {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), 5000);
  const combinedSignal = AbortSignal.any([signal, abortController.signal]);
  try {
    const response = await fetch(`https://countries.dev/name/${query}`, {
      signal: combinedSignal,
    });
    clearTimeout(timeoutId);
    if (response.status === 404) {
      return [];
    }
    if (!response.ok) {
      throw new HttpError(response.status);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof DOMException) {
      if (error.name === "AbortError") throw error;

      if (error.name === "TimeoutError") {
        throw error;
      }
    }

    throw error;
  }
}
