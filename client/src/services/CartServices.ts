import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getCartContentService = async () => {
  return axios
    .get(`${API_URL}/cart`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const addToCartService = async (productDetails: any) => {
  return axios
    .post(`${API_URL}/cart`, productDetails, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const updateCartService = async (productDetails: any) => {
  return axios
    .put(`${API_URL}/cart`, productDetails, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    });
};

export const deleteFromCartService = async (productId: number) => {
  return axios
    .delete(`${API_URL}/cart/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
    .then((response) => {
      return response.data;
    });
};
