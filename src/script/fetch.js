import axios from 'axios'
import { apiKey, BASE_URL, pathMovies } from './../config/common'

export async function fetchGenresList() {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: {
            api_key: apiKey,
        },
    })

    return response?.data
}

export async function fetchData({ path, params = null }) {
    const response = await axios.get(`${BASE_URL}${path}`, {
        params: {
            api_key: apiKey,
            ...params,
            // language: 'id-ID',
        },
    })
    return response?.data
}

export async function fetchSearchMovie({ value, page }) {
    return await fetchData({
        path: pathMovies,
        params: { query: value, page },
    })
}
