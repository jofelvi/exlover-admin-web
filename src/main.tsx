import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-toastify/dist/ReactToastify.css";
import { ResponseDto } from "./features/Auth/services/auth.ts";
import { ToastContainer } from "react-toastify";
import useToastNotifications from "./features/SharedComponents/CustomHook/ToastCustom/useToastNotifications.tsx";
import { AxiosError } from "axios";
import ModalCustom from "./features/SharedComponents/Modal/ModalCustom.tsx";
import ThemeProviderWrapper from "./Style/ThemeProviderWrapper.tsx";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        const errorResponse = error as AxiosError<ResponseDto<any>>; // Aserción de tipo
        if (errorResponse.response) {
          console.error(
            "Error de Axios mutations:",
            errorResponse.response?.data,
          );
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useToastNotifications().showError(
            errorResponse.response?.data.message,
          );
        } else {
          console.error("Error desconocido:", error);
        }
      },
      onSuccess: (data) => {
        const responseData = data as ResponseDto<any>;
        if (responseData.status === 200) {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useToastNotifications().showSuccess(responseData.message);
        }
      },
    },
    mutations: {
      onError: (error) => {
        const errorResponse = error as AxiosError<ResponseDto<any>>; // Aserción de tipo
        if (errorResponse.response) {
          console.error(
            "Error de Axios mutations:",
            errorResponse.response?.data,
          );
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useToastNotifications().showError(
            errorResponse.response?.data.message,
          );
        } else {
          console.error("Error desconocido:", error);
        }
      },
      onSuccess: (data) => {
        const responseData = data as ResponseDto<any>;
        if (responseData.status === 200) {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          useToastNotifications().showSuccess(responseData.message);
        }
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProviderWrapper>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <ToastContainer />
              <ModalCustom />
              <App />
            </LocalizationProvider>
          </ThemeProviderWrapper>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
