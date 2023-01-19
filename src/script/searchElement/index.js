import { fetchData } from '../fetch'
import fetchPage from '../Pagination'

const searchInput = $('#movie-search-input')
const searchForm = $('#movie-search-form')
const searchMoviesContainer = $('#search-movies-container')
const path = '/search/movie'

const searchElement = (props) => {
    // const { genres } = props

    searchInput.on('input', (e) => {
        if (e.target.value.length > 0) {
            $('#trending-movies-container').addClass('hidden')
            searchMoviesContainer.empty()
            $('.pagination').addClass('hidden')
        } else {
            $('#trending-movies-container').removeClass('hidden')
        }
    })

    searchForm.on('submit', async (e) => {
        e.preventDefault()
        const value = searchInput.val()
        const response = await fetchData({ path, params: { query: value } })
        const { total_pages } = response
        // searchElementHandler({ response, genres, value })
        // $('.pagination').empty()
        // Pagination({ total_pages, path, value, genres })
        await fetchPage()
    })
}

export default searchElement
