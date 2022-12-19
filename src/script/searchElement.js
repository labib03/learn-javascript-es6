import { fetchData } from './fetch'
import { RESULT_IMAGE_URL } from './../config/common'
import { convertGenre, convertMonth } from './../config/utils'
import { lazyImage } from './lazyLoadImage'

const searchInput = $('#movie-search-input')
const searchForm = $('#movie-search-form')
const path = '/search/movie'
const searchMoviesContainer = $('#search-movies-container')

let isSearching = false

const createCardResultElement = (movies, genres) => {
    // kerangka card untuk hasil pencarian
    const cardResultElement = movies.map((item, index) => {
        const date = new Date(item?.release_date)
        const month = convertMonth(date.getUTCMonth())
        const year = date.getFullYear()
        const day = date.getDate()

        const stringGenres = convertGenre(genres, item?.genre_ids)

        const imagePath = `${RESULT_IMAGE_URL}/${item?.poster_path}`

        const wrapper = $(
            `<div class="w-full py-3 px-5 h-[20rem] bg-gradient-to-r from-pink-50 rounded-xl flex gap-1 cursor-pointer transition duration-300 hover:scale-105">`
        )

        const imageContainer = $(
            `<div class="overflow-hidden relative h-full w-1/5 bg-transparent">`
        )

        const image =
            $(`    <img class="lazy w-max object-contain transition duration-700 bg-center rounded-xl h-full" data-src="${imagePath}" alt="${item?.title}"/>
    `)
        imageContainer.append(image)

        // description container
        const descriptionContainer = $(
            `<div class="p-3 flex flex-col h-full w-4/5 rounded-xl overflow-hidden">
            <h1 class="text-3xl font-bold tracking-wide">${item?.title}</h1>

            <div class="flex flex-col gap-1">
            <p class="text-sm">${year}</p>
            <p class="text-xs">${stringGenres.join(' / ')}</p>
            <p class="text-xs">Adult film : ${item?.adult ? 'Yes' : 'No'}</p>
            </div>

           <div class="mt-5 w-auto h-full">
            <p class="text-base">Overview :</p>
            <p class="text-base line-clamp-4 text-justify leading-relaxed tracking-wide">${
                item?.overview
            }</p>
           </div>

        </div>`
        )

        // container append
        wrapper.append(imageContainer, descriptionContainer)

        return wrapper
    })

    return cardResultElement
}

const createResultMoviesComponent = (movies, genres) => {
    if (movies.length > 1) {
        const titleContainer = $('<div>').addClass('mt-16')
        const title = $('<h1>')
            .addClass('text-xl font-semibold tracking-wide')
            .text(`Hasil pencarian untuk : ${searchInput.val()}`)

        const cardResult = createCardResultElement(movies, genres)

        titleContainer.append(title)
        searchMoviesContainer.append(titleContainer, cardResult)
    } else {
        const titleContainer = $('<div>').addClass('mt-16')
        const title = $('<h1>')
            .addClass('text-xl font-semibold tracking-wide')
            .text(`Hasil pencarian untuk : ${searchInput.val()}`)

        titleContainer.append(title)

        const emptyResult = $(`<h1>Hasil tidak ditemukan</h1>`)
        searchMoviesContainer.append(titleContainer, emptyResult)
    }
}

const createLoaderComponent = () => {
    searchMoviesContainer.empty()
    const LoaderComponent = $(`<div class="mt-24">

    <div class="leap-frog">
    <div class="leap-frog__dot"></div>
    <div class="leap-frog__dot"></div>
    <div class="leap-frog__dot"></div>
    </div>
    </div>`)

    return searchMoviesContainer.append(LoaderComponent)
}

const searchResultElement = (movies, genres) => {
    searchMoviesContainer.empty()
    createResultMoviesComponent(movies, genres)

    lazyImage()
}

searchInput.on('input', (e) => {
    if (e.target.value.length > 0) {
        $('#trending-movies-container').addClass('hidden')
        searchMoviesContainer.empty()
    } else {
        $('#trending-movies-container').removeClass('hidden')
    }
})

const searchElement = (props) => {
    const { genres } = props

    searchForm.on('submit', async (e) => {
        e.preventDefault()
        if (searchInput.val().length > 0) {
            searchInput.blur()
            const value = searchInput.val()
            createLoaderComponent()
            const { results } = await fetchData(path, { query: value })

            if (results) {
                const timer = setTimeout(() => {
                    searchResultElement(results, genres)

                    return clearTimeout(timer)
                }, 1000)
            }
        }

        return
    })
}

export default searchElement
