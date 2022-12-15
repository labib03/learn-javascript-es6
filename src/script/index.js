import '../css/style.css'
import 'flowbite'
import trendingMoviesElement from './trendingMovies'
import searchElement from './searchElement'
import { fetchGenresList } from './fetch'

const main = (props) => {
    const { genres } = props

    trendingMoviesElement()
    searchElement({ genres })
}

document.addEventListener('DOMContentLoaded', async () => {
    const { genres } = await fetchGenresList()
    main({ genres })
})
