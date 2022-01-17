import axios from "../../utils/axios";

export const getUserProfile = (id) => {
  return {
    type: "GET_USER_PROFILE",
    payload: axios.get(`/user/profile/${id}`),
  };
};

export const updateProfile = (id, data) => {
  return {
    type: "UPDATE_USER_PROFILE",
    payload: axios.patch(`/user/profile/${id}`, data),
  };
};

export const updateImage = (id, data) => {
  return {
    type: "UPDATE_USER_IMAGE",
    payload: axios.patch(`/user/image/${id}`, data),
  };
};

export const deleteImage = (id) => {
  return {
    type: "DELETE_USER_IMAGE",
    payload: axios.delete(`/user/image/${id}`),
  };
};

export const updatePassword = (id, data) => {
  return {
    type: "UPDATE_USER_PASSWORD",
    payload: axios.patch(`/user/password/${id}`, data),
  };
};

export const updatePin = (id, data) => {
  return {
    type: "UPDATE_USER_PIN",
    payload: axios.patch(`/user/pin/${id}`, data),
  };
};
