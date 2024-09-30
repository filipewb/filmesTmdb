import axios from 'axios'

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "522ecf824782ff607bab0a0628238d4b",
    language: "pt-BR",
    include_adults: false,
  },
})