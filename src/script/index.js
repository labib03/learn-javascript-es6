import '../css/style.css'
import 'flowbite'
import trendingMoviesElement from './trendingMovies'
import searchElement from './searchElement'
import { fetchGenresList } from './fetch'

const backToSearchButton = document.querySelector('#back-to-search-button')

const main = (props) => {
    const { genres } = props

    trendingMoviesElement()
    searchElement({ genres })
}

document.addEventListener('DOMContentLoaded', async () => {
    const { genres } = await fetchGenresList()

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 1000) {
            backToSearchButton.classList.remove('hidden')
        } else {
            backToSearchButton.classList.add('hidden')
        }
    })

    backToSearchButton.addEventListener('click', () => {
        // window.scrollTo({
        //     top: 0,
        //     behavior: 'smooth',
        // })
        document.getElementById('movie-list').scrollIntoView({
            behavior: 'smooth',
        })
    })

    main({ genres })
})
