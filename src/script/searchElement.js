import fetchData from './fetch'

const searchInput = $('#movie-search-input')
const searchForm = $('#movie-search-form')
const path = '/search/movie'
const searchMoviesContainer = $('#search-movies-container')

const searchResultElement = () => {
    const titleContainer = $('<div>').addClass('mt-16')
    const title = $('<h1>')
        .addClass('text-4xl font-semibold tracking-wide')
        .text(`Hasil pencarian untuk : ${searchInput.val()}`)

    // template aja
    const arr = [1, 2, 3, 4, 5]
    // kerangka
    const div = arr.map((item) => {
        const x = $('<div>')
            .addClass(
                'w-full h-[20rem] bg-red-500 rounded-xl flex items-center justify-center text-2xl cursor-pointer transition duration-300 hover:scale-105'
            )
            .text(searchInput.val() + ' ' + item)
        return x
    })

    titleContainer.append(title)
    searchMoviesContainer.append(titleContainer, div)
}

const searchElement = () => {
    searchForm.on('submit', (e) => {
        if (searchInput.val().length > 0) {
            e.preventDefault()
            const value = searchInput.val()
            fetchData(path, { query: value })

            searchResultElement()
        }

        return
    })
}

searchInput.on('input', (e) => {
    if (e.target.value.length > 0) {
        $('#trending-movies-container').addClass('hidden')
        searchMoviesContainer.empty()
    } else {
        $('#trending-movies-container').removeClass('hidden')
    }
})

export default searchElement
