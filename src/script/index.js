import '../css/style.css'
import 'flowbite'
import trendingMoviesElement from './trendingMovies'
import searchElement from './searchElement'
import { fetchGenresList } from './fetch'

const backToTopButton = document.querySelector('#back-to-top-button')

const main = (props) => {
    const { genres } = props

    trendingMoviesElement()
    searchElement({ genres })
}

document.addEventListener('DOMContentLoaded', async () => {
    const { genres } = await fetchGenresList()

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden')
        } else {
            backToTopButton.classList.add('hidden')
        }
    })

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    })

    main({ genres })
})
