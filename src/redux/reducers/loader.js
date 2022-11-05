import { SET_LOADER } from "../constants";

const initialState = {
  isLoading: false,
};

const loader = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_LOADER: 
      return {
        ...state, 
        isLoading: payload,
      };
    default: return state;
  }
};

export default loader;