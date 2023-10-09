import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../hooks/axiosInstance';
import { notification } from 'antd';

const callNotification = ((description, type) => {
  notification.open({
    message: 'info',
    description: description,
    duration: 3, // Duration in seconds, 0 means the notification won't close automatically,
    type: type,
  });
})

const initialState = {
  templates: [],
  template_loading: false,
  template_error: null,
};
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchTemplatesAsync = createAsyncThunk('template/fetchTemplates', async () => {
  try {
    const url = BACKEND_URL + '/template/fetchTemplates';
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const createTemplateAsync = createAsyncThunk(
  'template/createTemplate',
  async (templateData) => {
    try {
      const url = BACKEND_URL + '/template/createTemplate';
      const response = await axiosInstance.post(url, templateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updateTemplateAsync = createAsyncThunk(
  'template/updateTemplate',
  async (templateData) => {
    try {
      const url = BACKEND_URL + `/template/updateTemplate/${templateData.id
    }`;
      const response = await axiosInstance.put(url, templateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteTemplateAsync = createAsyncThunk(
  'template/deleteTemplate',
  async (templateId) => {
    try {
      const url = BACKEND_URL + `/template/deleteTemplate/${ templateId } `;
      await axiosInstance.delete(url);
      return templateId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    resetStateTemplate: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplatesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplatesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload;
      })
      .addCase(fetchTemplatesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTemplateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTemplateAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.templates.push(action.payload);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(createTemplateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(updateTemplateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTemplateAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTemplate = action.payload;
        const index = state.templates.findIndex(
          (template) => template.id === updatedTemplate.id
        );
        if (index !== -1) {
          state.templates[index] = updatedTemplate;
        }
        callNotification('Operation Successfull', 'success');
      })
      .addCase(updateTemplateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      })
      .addCase(deleteTemplateAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTemplateAsync.fulfilled, (state, action) => {
        state.loading = false;
        const templateId = action.payload;
        state.templates = state.templates.filter((template) => template.id !== templateId);
        callNotification('Operation Successfull', 'success');
      })
      .addCase(deleteTemplateAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        callNotification(state.error, 'error');
      });
  },
});
export const { resetStateTemplate } = templateSlice.actions;
export const templateReducer = templateSlice.reducer;