import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const JSON_PLACEHOLDER_BASE_URL = 'https://jsonplaceholder.typicode.com/'

export const jsonPlaceholderBaseQuery = fetchBaseQuery({
  baseUrl: JSON_PLACEHOLDER_BASE_URL,
})
