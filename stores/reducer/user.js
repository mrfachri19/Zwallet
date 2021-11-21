const initialState = {
  userProfile: {},
  users: [],
  isLoading: false,
  isError: false,
  message: "",
  pageInfo: {},
};

export default function user(state = initialState, action) {
  switch (action.type) {
    // GET_USER_BY_ID
    case "GET_USER_BY_ID_PENDING": {
      return {
        ...state,
        isLoading: true,
        isError: false,
        users: [],
        // message: action.payload.data.msg
      };
    }
    case "GET_USER_BY_ID_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        users: action.payload.data.data[0],
        message: action.payload.data.msg,
      };
    }
    case "GET_USER_BY_ID_REJECTED": {
      return {
        ...state,
        isLoading: true,
        isError: true,
        users: [],
        message: action.payload.response.data.msg,
      };
    }
    default: {
      return { ...state };
    }
  }
}
