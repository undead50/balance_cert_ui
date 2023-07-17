import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../hooks/axiosInstance';
// import axiosInstance from 'axiosInstance';


const initialState = {
  questions: [],
  loading: false,
  error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchQuestionsAsync = createAsyncThunk(
  'question/fetchQuestions',
  async () => {
    try {
      const url = BACKEND_URL + '/question/fetchQuestions';
      const response = await axiosInstance.get(url);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const createQuestionAsync = createAsyncThunk(
  'question/createQuestion',
  async (questionData) => {
    try {
      const url = BACKEND_URL + '/question/createQuestion';
      const response = await axiosInstance.post(url, questionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateQuestionAsync = createAsyncThunk(
  'question/updateQuestion',
  async (questionData) => {
    try {
      const url = BACKEND_URL + `/question/updateQuestion/${questionData.id}`;
      const response = await axiosInstance.put(url, questionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteQuestionAsync = createAsyncThunk(
  'question/deleteQuestion',
  async (questionId) => {
    try {
      const url = BACKEND_URL + `/question/deleteQuestion/${questionId}`;
      await axiosInstance.delete(url);
      return questionId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestionsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createQuestionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuestionAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.questions.push(action.payload);
      })
      .addCase(createQuestionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateQuestionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateQuestionAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedQuestion = action.payload;
        const index = state.questions.findIndex(
          (question) => question.id === updatedQuestion.id
        );
        if (index !== -1) {
          state.questions[index] = updatedQuestion;
        }
      })
      .addCase(updateQuestionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteQuestionAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestionAsync.fulfilled, (state, action) => {
        state.loading = false;
        const questionId = action.payload;
        state.questions = state.questions.filter(
          (question) => question.id !== questionId
        );
      })
      .addCase(deleteQuestionAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const questionReducer = questionSlice.reducer;
