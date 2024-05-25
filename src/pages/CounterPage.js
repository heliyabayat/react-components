import React, { useReducer } from "react";
// import { produce } from "immer";

import Button from "../components/Button";
import Panel from "../components/Panel";

const INCREMENT = "increment";
const DECREMENT = "decrement";
const INPUT_VALUE = "input-value";
const ADD_VALUE_TO_COUNT = "add_value_to_count";

const reducer = (state, action) => {
  //when we have a lot of if and else we can use switch to make it shorter
  //if cases are equal to value(action.type) return .....
  switch (action.type) {
    //we can not directly modify the obj and its properties,so we have to overwrite the properties .first we have to return a copy of  every thing of obj by ... than overwrite it.
    //but if we use immer we do not have to copy and overwrite it.we directly chang the property

    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case INPUT_VALUE:
      return {
        ...state,
        valueToAdd: action.payload,
      };
    case ADD_VALUE_TO_COUNT:
      return {
        ...state,
        count: state.count + state.valueToAdd,
      };
    //when we do not receive or receive wrong type ,default shows up
    //we can return state( ignored and no updates) or write an error for it
    default:
      return state;
    // throw new Error("unexpected action type:" + action.type);
  }

  //with immer
  // switch (action.type) {
  //   case INCREMENT:
  //     state.count = state.count + 1;
  //     return;

  //   case DECREMENT:
  //     state.count = state.count - 1;
  //     return;
  //   case INPUT_VALUE:
  //     state.valueToAdd = action.payload;
  //     return;
  //   case ADD_VALUE_TO_COUNT:
  //     state.count = state.count + state.valueToAdd;
  //     state.valueToAdd = 0
  //     return;
  //   default:
  //     return state;
  // }
  //۷۷ with if else ۷۷
  // if (action.type === INCREMENT) {
  // return {
  //   ...state,
  //   count: state.count + 1,
  // };
  // } else if (action.type === DECREMENT) {
  // return {
  //   ...state,
  //   count: state.count - 1,
  // };
  // } else if (action.type === INPUT_VALUE) {
  //   return {
  //     ...state,
  //     valueToAdd: action.payload,
  //   };
  // } else if (action.type === x) {
  // return {
  //   ...state,
  //   count: state.count + state.valueToAdd,
  // };
  // }
  // return state;
};

export default function CounterPage({ initialCount }) {
  const [state, dispatch] = useReducer(produce(reducer), {
    count: initialCount,
    valueToAdd: 0,
  });
  // const [count, SetCount] = useState(initialCount);
  // const [valueToAdd, setValueToAdd] = useState(0);
  const increment = () => {
    // SetCount(count + 1);
    dispatch({
      type: INCREMENT,
    });
  };
  const decrement = () => {
    // SetCount(count - 1);
    dispatch({
      type: DECREMENT,
    });
  };
  const handleChange = (event) => {
    // return value from input is string ,so we use parseInt (make number)and we set 0 too because pars returns NaN for empty string
    const value = parseInt(event.target.value) || 0;
    dispatch({
      type: INPUT_VALUE,
      payload: value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: ADD_VALUE_TO_COUNT,
      valueToAdd: 0,
    });
    // SetCount(count + valueToAdd);
    // setValueToAdd(0);
  };
  return (
    <Panel className="m-3">
      <h1 className="text-lg">count is {state.count}</h1>
      <div className="flex">
        <Button onClick={increment}>increment</Button>
        <Button onClick={decrement}>decrement</Button>
      </div>
      <form onSubmit={handleSubmit}>
        <label>add alot</label>
        <input
          onChange={handleChange}
          value={state.valueToAdd || ""}
          type="number"
          className="p-1 m-3 bg-gray-50 border border-gray-300"
        />
        <Button>add it</Button>
      </form>
    </Panel>
  );
}
