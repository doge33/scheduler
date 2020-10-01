import { renderHook, act } from "@testing-library/react-hooks";
import  useVisualMode from "hooks/useVisualMode";


const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD ="THIRD";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});


test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});


test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => {
    //console.log("inside 1st transition: mode 1 --> 2")
    result.current.transition(SECOND)
  });
  expect(result.current.mode).toBe(SECOND);

  act(() => {
    //console.log("inside 2nd transition: mode 2 --> 3")
    result.current.transition(THIRD);

  });
  expect(result.current.mode).toBe(THIRD);

  act(() => {
    //console.log("inside 1st back: mode 3 --> 2")
    result.current.back()
  });
  expect(result.current.mode).toBe(SECOND);

  act(() => {
    //console.log("inside 2nd back: mode 2 --> 1")
    result.current.back()
  });
  expect(result.current.mode).toBe(FIRST);
});

//---validation: do not allow user to go back pass initial mode-----
test("useVisualMode should not return to previous mode if already at initial", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});

//skip some modes: add replace booleans to transition function
test("useVisualMode should replace the current mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  // Passing "true" to transition(THIRD, true) says "Transition to THIRD by REPLACING SECOND"
  act(() => result.current.transition(THIRD, true));
  expect(result.current.mode).toBe(THIRD);

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});