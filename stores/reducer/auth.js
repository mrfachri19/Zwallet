const initialState = {
  idUser: "",
  isError: false,
  isLoading: false,
  msg: "",
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    // LOGIN
    case "LOGIN_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
        idUser: "",
        msg: "",
      };
    case "LOGIN_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        idUser: action.payload.data.data.id,
        msg: action.payload.data.msg,
      };
    }
    case "LOGIN_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        idUser: "",
        msg: action.payload.response.data.msg,
      };
    }

    // REGISTER
    case "REGISTER_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "REGISTER_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        idUser: action.payload.data.data.id,
        msg: action.payload.data.msg,
      };
    }
    case "REGISTER_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }

    // LOGOUT
    case "LOGOUT_PENDING":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "LOGOUT_FULFILLED": {
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };
    }
    case "LOGOUT_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };
    }
    default: {
      return state;
    }
  }
};

export default auth;
