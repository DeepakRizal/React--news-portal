import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Article } from "../types";
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

interface ArticleState {
  articles: Article[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
  category: string;
  page: number;
}

const initialState: ArticleState = {
  articles: [],
  status: "idle",
  error: undefined,
  category: "general",
  page: 1,
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async ({ category, page }: { category: string; page: number }) => {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        category,
        page,
        apiKey: API_KEY,
        country: "us",
      },
    });
    return response.data.articles as Article[];
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setPage } = articlesSlice.actions;

export default articlesSlice.reducer;
