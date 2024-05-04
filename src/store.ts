import { configureStore } from "@reduxjs/toolkit";
import recruiterSlice from "./redux/recruiter/recruiterSlice";
export const store = configureStore({
  reducer: {
    recruiterSlice: recruiterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
