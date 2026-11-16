import { describe, it, expect, beforeEach, vi } from "vitest";
import { searchCountries } from "./searchCountries.js";
import { HttpError } from "./HttpError.js";
import data from "./fakeData/countries.json" with { type: "json" };
beforeEach(() => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue(
    new Response(JSON.stringify([...data]), {
      status: 200,
      statusText: "OK",
    }),
  );
});

const signal = new AbortController().signal;

describe("searchCountries", () => {
  it("should return an array of countries", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify([...data]), {
        status: 200,
        statusText: "OK",
      }),
    );
    const result = await searchCountries("usa", signal);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]?.name).toBe("United States of America");
  });

  it("should return empty array when status is 404", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 404 }),
    );
    const result = await searchCountries("badquery", signal);
    expect(result).toEqual([]);
  });

  it("should throw HttpError when status is 500", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 500 }),
    );
    await expect(searchCountries("badquery", signal)).rejects.toThrow(
      HttpError,
    );
  });

  it("should throw error when network fails", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new TypeError("Failed to fetch"),
    );
    await expect(searchCountries("usa", signal)).rejects.toThrow(TypeError);
  });

  it("should throw AbortError when request is aborted", async () => {
    const controller = new AbortController();
    controller.abort();

    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new DOMException("The user aborted a request", "AbortError"),
    );
    const error = await searchCountries("usa", controller.signal).catch(
      (e) => e,
    );
    expect(error.name).toBe("AbortError");
  });

  // 6. Таймаут — кидается TimeoutError (отдельно от AbortError)
  it("should throw TimeoutError on timeout", async () => {
    // ...код теста...
  });

  // 7. Гонка запросов — старый ответ не перезаписывает новый
  it("should ignore stale response when newer request arrives", async () => {
    // ...код теста...
  });
});
