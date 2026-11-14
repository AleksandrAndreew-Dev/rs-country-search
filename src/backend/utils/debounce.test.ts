import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import debounce from "./debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("do not call fn after first call ", async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);

    debounced("a");
    expect(fn).not.toHaveBeenCalled();
  });

  it("call fn once after delay", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);
    debounced("a");
    vi.advanceTimersByTime(1000);

    expect(fn).toHaveBeenCalledWith("a");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("reset timer after next call", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 1000);

    debounced("a");
    vi.advanceTimersByTime(100);
    debounced("b");
    vi.advanceTimersByTime(200);
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith("b");
  });
});
