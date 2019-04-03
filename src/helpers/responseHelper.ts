export const convertErrorToObject = (err: any) => {
  let error: { [key: string]: any } = err
  if (err instanceof Error) {
    error = err
  } else if (typeof err === 'object') {
    error = new Error(JSON.stringify(err))
  } else {
    error = new Error(err)
  }
  const result: { [key: string]: any } = {}
  Object.getOwnPropertyNames(error).forEach(key => {
    result[key] = error[key]
  })
  return result
}

export const convertErrorResponse = (err: any): any => {
  const error = convertErrorToObject(err)
  const response: any = {
    data: {},
    error: {},
    statusCode: 200
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(error)
  }

  if (error.code === 'ECONNABORTED') {
    // Timeout Error
    response.status = 408
    response.error = {
      message: 'timeout error.'
    }
    return response
  }

  response.status = err.response.status
  response.error = {
    message: 'error.'
  }
  return response
}
