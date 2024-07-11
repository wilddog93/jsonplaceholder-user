/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Action,
  AnyAction,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { RootState } from "@/stores/reducer/redcuers";

import AxiosInstance, { AxiosRequestConfig } from 'axios';

const axios = AxiosInstance.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

const prefix = "/users";

export type UserProps = {
  id?: number,
  name?: string,
  username?: string,
  email?: string,
  address?: {
    street?: string,
    suite?: string,
    city?: string,
    zipcode?: string,
    geo?: {
      lat?: string | number,
      lng?: string | number
    }
  },
  phone?: string,
  website?: string,
  company?: {
    name?: string,
    catchPhrase?: string,
    bs?: string
  },
  avatar?: string
}

// here we are typing the types for the state
export type UserStateProps = {
  users: UserProps[];
  pending: boolean;
  error: boolean;
  message?: string;
};

const initialState: UserStateProps = {
  users: [],
  pending: false,
  error: false,
  message: "",
};

interface HeadersConfigurationProps {
  headers: {
    "Content-Type"?: string;
    Accept?: string;
  };
  params?: AxiosRequestConfig
}

let config: HeadersConfigurationProps = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// rejection
interface RejectedAction extends Action {
  error: Error;
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith("rejected");
}

// user-data-action
interface UserActionProps {
  id?: string | number;
  data?: UserProps;
  isSuccess: () => Promise<void>;
  isError: (error:any) => Promise<void>;
}

// get-users
export const getUsers = createAsyncThunk<any, AxiosRequestConfig, { state: RootState }>(
  "get-users",
  async (params) => {
    config = {
      ...config,
      params: params
    }
    try {
      const response = await axios.get(prefix, config);
      const { data, status } = response;
      if (status == 200) {
        return data;
      } else {
        throw response;
      }
    } catch (error: any) {
      const { data, status } = error.response;
      const newError: any = { message: data?.error?.message };
      if (status === 404) {
        throw new Error("User not found");
      } else {
        throw new Error(newError.message);
      }
    }
  }
);

// create-user
export const createUser = createAsyncThunk<any, UserActionProps, { state: RootState }>(
  "create-user",
  async (formData) => {
    try {
      const response = await axios.post(prefix, formData.data, config);
      const { data, status } = response;
      if (status == 201) {
        await formData.isSuccess();
        return data;
      } else {
        throw response;
      }
    } catch (error: any) {
      const { data, status } = error.response;
      const newError: any = { message: data?.error?.message };
      await formData.isError(newError);
      if (status === 404) {
        throw new Error("User not found");
      } else {
        throw new Error(newError.message);
      }
    }
  }
);

// update-user
export const updateUser = createAsyncThunk<any, UserActionProps, { state: RootState }>(
  "update-user",
  async (formData) => {
    try {
      const response = await axios.patch(`${prefix}/${formData?.id}`, formData.data, config);
      const { data, status } = response;
      if (status == 200) {
        await formData.isSuccess();
        return data;
      } else {
        throw response;
      }
    } catch (error: any) {
      const { data, status } = error.response;
      const newError: any = { message: data?.error?.message };
      await formData.isError(newError);
      if (status === 404) {
        throw new Error("User not found");
      } else {
        throw new Error(newError.message);
      }
    }
  }
);

// delete-user
export const deleteUser = createAsyncThunk<any, UserActionProps, { state: RootState }>(
  "delete-user",
  async (formData) => {
    try {
      const response = await axios.delete(`${prefix}/${formData?.id}`, config);
      const { status } = response;
      console.log(response, 'result-delete');
      if (status == 200) {
        await formData.isSuccess();
        return formData?.id;
      } else {
        throw response;
      }
    } catch (error: any) {
      const { data, status } = error.response;
      const newError: any = { message: data?.error?.message };
      await formData.isError(newError);
      if (status === 404) {
        throw new Error("User not found");
      } else {
        throw new Error(newError.message);
      }
    }
  }
);

// SLICER
export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // leave this empty here
    resetUsers(state) {
      state.users = [];
      state.pending = false;
      state.error = false;
      state.message = "";
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere, including actions generated by createAsyncThunk or in other slices.
  // Since this is an API call we have 3 possible outcomes: pending, fulfilled and rejected. We have made allocations for all 3 outcomes.
  // Doing this is good practice as we can tap into the status of the API call and give our users an idea of what's happening in the background.
  extraReducers: (builder) => {
    builder
      // get-users
      .addCase(getUsers.pending, (state) => {
        return {
          ...state,
          pending: true,
        };
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        return {
          ...state,
          pending: false,
          error: false,
          users: payload,
        };
      })
      .addCase(getUsers.rejected, (state, { error }) => {
        state.pending = false;
        state.error = true;
        state.message = error.message;
      })

      // create-users
      .addCase(createUser.pending, (state) => {
        return {
          ...state,
          pending: true,
        };
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          pending: false,
          error: false,
          users: [...state.users, payload],
        };
      })
      .addCase(createUser.rejected, (state, { error }) => {
        state.pending = false;
        state.error = true;
        state.message = error.message;
      })

      // update-user
      .addCase(updateUser.pending, (state) => {
        return {
          ...state,
          pending: true,
        };
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const updatedUsers = state.users.map((user) => {
          if (user?.id === payload?.id) {
            user = payload
          }
          return user;
        });
        return {
          ...state,
          pending: false,
          error: false,
          users: updatedUsers,
        };
      })
      .addCase(updateUser.rejected, (state, { error }) => {
        state.pending = false;
        state.error = true;
        state.message = error.message;
      })

      // delete-user
      .addCase(deleteUser.pending, (state) => {
        return {
          ...state,
          pending: true,
        };
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        const updatedUsers = state.users.filter((user) => {
          return user.id !== payload;
        });
        return {
          ...state,
          pending: false,
          error: false,
          users: updatedUsers,
        };
      })
      .addCase(deleteUser.rejected, (state, { error }) => {
        state.pending = false;
        state.error = true;
        state.message = error.message;
      })

      .addMatcher(isRejectedAction, (state, action) => {
        const base = {
          ...state,
          ...action.error,
        };
        return base;
      })
      .addDefaultCase((state, action) => {
        const base = {
          ...state,
          ...action,
        };
        return base;
      });
  },
});
// SLICER

const userReducers = userSlice.reducer;

export const selectUsers = (state: RootState) => state.users;
export const { resetUsers } = userSlice.actions;

export default userReducers;