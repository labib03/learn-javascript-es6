import axios from 'axios'
import { apiKey, BASE_URL } from './../config/common'

export async function fetchGenresList() {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: {
            api_key: apiKey,
        },
    })

    return response?.data
}

export async function fetchData(path, param = null) {
    const response = await axios.get(`${BASE_URL}${path}`, {
        params: {
            api_key: apiKey,
            // language: 'id-ID',
            ...param,
        },
    })
    return response?.data
}
