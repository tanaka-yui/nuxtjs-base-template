import { AxiosResponse } from 'axios'

export interface ErrorObject {
  message?: string
}

export interface PagingObject {
  totalCount: number
  pageCount: number
  pageSize: number
  currentPage: number
}

export interface ApiResponse<T> extends AxiosResponse<T> {
  error?: ErrorObject
  data: T
  paging?: PagingObject
  status: number
}
