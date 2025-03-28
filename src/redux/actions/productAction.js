import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/API";

// Get Product Details
export const getProductDetails = createAsyncThunk(
  "products/getProductDetails",
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/product/${id}`);
      return data?.product;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Get All Products
export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (
    {
      keyword = "",
      currentPage = 1,
      price = [0, 50000],
      category,
      productType,
      material,
      shape,
      gender,
      frameType,
      limit = 36,
    },
    { rejectWithValue }
  ) => {
    try {
      let url = `/all-products?keyword=${keyword}&limit=${limit}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`;

      // Adding category to the URL if it exists
      if (category) {
        url += `&category=${category}`;
      }
      if (productType) {
        url += `&productType=${productType}`;
      }

      // Adding material filter to the URL if it exists
      if (material) {
        url += `&material=${material}`;
      }

      // Adding shape filter to the URL if it exists
      if (shape) {
        url += `&shape=${shape}`;
      }

      // Adding gender filter to the URL if it exists
      if (gender) {
        url += `&gender=${gender}`;
      }

      // Adding frameType filter to the URL if it exists
      if (frameType) {
        url += `&frameType=${frameType}`;
      }

      const { data } = await API.get(url);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);

// Get All Admin Products
export const getAdminProducts = createAsyncThunk(
  "products/getAdminProducts",
  async ({ page = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await API.get(`/all-products?page=${page}`);
      return data ?? {};
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

// Create Product (Admin)
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      console.log(formData);

      const config = {
        headers: { "Content-type": "application/json" },
      };

      await API.post(`/admin/add-product`, formData, config);
      return;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

// Update Product (Admin)

export const updateProduct = createAsyncThunk(
  "products/update",
  async (formData, { rejectWithValue }) => {
    try {
      console.log("Update ACion Called");
      let id = formData.get("id");
      const config = {
        headers: { "Content-type": "multipart/form-data" },
      };

      const body = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        category: formData.get("category"),
      };
      console.log(body);
      await API.put(`/admin/update-product/${id}`, body, config);
      return;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);

// Delete Product (Admin)
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(`/admin/delete-product/${id}`);

      if (data?.success === false) {
        return rejectWithValue(data?.message);
      }

      return;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

// Create Review
export const createReview = createAsyncThunk(
  "products/createReview",
  async ({ rating, reviewMessage, productId }, { rejectWithValue }) => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await API.put(
        `/review`,
        { rating, comment: reviewMessage, productId },
        config
      );

      if (data?.success) {
        return;
      } else {
        return rejectWithValue(data?.message);
      }
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message ?? error?.message);
    }
  }
);
