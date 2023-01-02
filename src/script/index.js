import '../css/style.css'
import 'flowbite'
import trendingMoviesElement from './trendingMovies'
import searchElement from './searchElement'
import { fetchGenresList } from './fetch'

const backToSearchButton = document.querySelector('#back-to-search-button')
const goToMovieListButton = document.querySelector('.cta-landing-page')

const main = (props) => {
    const { genres } = props

    trendingMoviesElement()
    searchElement({ genres })
}

document.addEventListener('DOMContentLoaded', async () => {
    const { genres } = await fetchGenresList()
    $('.pagination').addClass('hidden')
    backToSearchButton.classList.add('hidden')

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

    goToMovieListButton.addEventListener('click', () => {
        document.getElementById('movie-list').scrollIntoView({
            behavior: 'smooth',
        })
    })

    main({ genres })
})
