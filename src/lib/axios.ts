import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://djz68gs30g.execute-api.sa-east-1.amazonaws.com',
})
