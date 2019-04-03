import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { Route, VueRouter } from 'vue-router'
import { Store } from 'vuex'
import { Vue } from 'vue'

import { Request } from './express'

interface NuxtContext<Q = any, P = any, S = any> {
  isClient: boolean
  isServer: boolean
  isStatic: boolean
  isDev: boolean
  isHMR: boolean
  route: Route
  store: Store<S>
  env: object
  query: Q
  nuxtState: object
  req: Request
  res: Response
  params: P
  redirect: (path: string) => void
  error: (params: { statusCode?: String; message?: String }) => void
  beforeNuxtRender: ({ Conmponents, nuxtState }) => void
  $axios: NuxtAxiosInstance
}

interface NuxtAxiosInstance extends AxiosInstance {
  $request<T = any>(config: AxiosRequestConfig): Promise<T>
  $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
  $post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>
  $put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>
  $patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T>

  setHeader(
    name: string,
    value?: string | false,
    scopes?: string | string[]
  ): void
  setToken(
    token: string | false,
    type?: string,
    scopes?: string | string[]
  ): void

  onRequest(callback: (config: AxiosRequestConfig) => void): void
  onResponse<T = any>(callback: (response: AxiosResponse<T>) => void): void
  onError(callback: (error: AxiosError) => void): void
  onRequestError(callback: (error: AxiosError) => void): void
  onResponseError(callback: (error: AxiosError) => void): void
}

type Refs<T extends object> = Vue['$refs'] & T

type Data<T extends object> = Vue['$data'] & T

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    layout?: string
  }
}

interface VueRoute<Q = any, P = any> {
  query: Q
  params: P
}
