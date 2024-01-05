"use client";
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import defaultAxios, { AxiosInstance, AxiosPromise } from "axios";
import React, { PropsWithChildren } from "react";

export interface IApiClientContext {
  axios: AxiosInstance;
  api: <T extends unknown>(axiosPromise: AxiosPromise<T>) => Promise<T>;
}

const ApiClientContext = React.createContext<IApiClientContext>({} as any);

export const ApiClientProvider: React.FC<
  PropsWithChildren<{ axiosInstance?: AxiosInstance }>
> = ({ axiosInstance, children }) => {
  const api = React.useCallback(
    async <T extends unknown>(axiosPromise: AxiosPromise<T>) =>
      await axiosPromise.then(({ data }) => data),
    []
  );

  const value = {
    axios: axiosInstance || defaultAxios,
    api,
  };

  return (
    <ApiClientContext.Provider value={value}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = () => {
  const context = React.useContext(ApiClientContext);

  if (!context) {
    throw new Error("useApiClient must be used within ApiClientProvider");
  }

  return context;
};
