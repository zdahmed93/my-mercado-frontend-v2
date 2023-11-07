import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { alertError, alertSuccess, extractErrorMessage } from "../utilities/feedback";


export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/items`)
  return res.data
})

export const fetchItemById = createAsyncThunk('items/fetchItemById', async (id) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/items/${id}`)
  return res.data
})

export const requestCreatingItem = createAsyncThunk(
  'items/requestCreatingItem',
  async ({ formData, navigate }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/items`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token
          }
        }
      )
      navigate('/')
      return res.data
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  })

export const requestUpdatingItem = createAsyncThunk(
  'items/requestUpdatingItem',
  async ({ id, data, navigate }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/items/${id}`,
        data,
        {
          headers: {
            Authorization: token
          }
        }
      )
      navigate(`/items/${id}`)
      return res.data
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  })

export const requestDeletingItem = createAsyncThunk(
  'items/requestDeletingItem',
  async ({ id, closeModal }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/items/${id}`,
        {
          headers: {
            Authorization: token
          }
        }
      )
      closeModal()
      return res.data
    } catch (error) {
      const errorMessage = extractErrorMessage(error)
      return rejectWithValue(errorMessage)
    }
  })

export const userSlice = createSlice({
  name: 'items',
  initialState: {
    list: [],
    isLoading: false,
    error: null,
    selected: null
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = action.payload
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })

      .addCase(requestCreatingItem.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestCreatingItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.list.push(action.payload.item)
        alertSuccess(action.payload.message)
      })
      .addCase(requestCreatingItem.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })

      .addCase(fetchItemById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.isLoading = false
        state.selected = action.payload
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })

      .addCase(requestUpdatingItem.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestUpdatingItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = state.list.map(element => element._id === action.payload.item._id ? action.payload.item : element)
        alertSuccess(action.payload.message)
      })
      .addCase(requestUpdatingItem.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })

      .addCase(requestDeletingItem.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestDeletingItem.fulfilled, (state, action) => {
        state.isLoading = false
        state.list = state.list.filter(element => element._id !== action.payload.item._id)
        alertSuccess(action.payload.message)
      })
      .addCase(requestDeletingItem.rejected, (state, action) => {
        state.isLoading = false
        const errorMessage = action.payload
        alertError(errorMessage)
        state.error = errorMessage
      })
  }
})


export default userSlice.reducer