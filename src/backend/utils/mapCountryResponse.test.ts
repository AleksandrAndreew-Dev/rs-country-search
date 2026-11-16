import { describe, it, expect } from "vitest";
import { mapCountryResponse } from "./mapCountryResponse.js";
import type { ApiResponse, Card } from "./types/types.js";
import data from "./fakeData/countries.json" with { type: "json" };

describe("mapCountryResponse", () => {
  it("should return correct response for empty query ", () => {
    const response: ApiResponse = [];
    const result: Card[] = mapCountryResponse(response);
    expect(result.length).toBe(0);
  });
  it("should return all countries", () => {
    const result = mapCountryResponse(data);
    expect(result.length).toBe(4);
    expect(result[0]?.name).toBe(data[0]?.name);
  });
});
