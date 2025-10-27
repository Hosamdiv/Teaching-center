type Action =
  | { type: "add"; payload: number }
  | { type: "subtract"; payload: number }
  | { type: "multiply"; payload: number }
  | { type: "divide"; payload: number }
  | { type: "clear" };

export const reducer = (state: number, action: Action): number => {
  switch (action.type) {
    case "add":
      return state + action.payload;
    case "subtract":
      return state - action.payload;
    case "multiply":
      return state * action.payload;
    case "divide":
      return action.payload !== 0 ? state / action.payload : state; // تجنب القسمة على صفر
    case "clear":
      return 0;
    default:
      return state;
  }
};
