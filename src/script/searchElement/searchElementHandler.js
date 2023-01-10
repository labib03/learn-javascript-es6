import { fetchData } from '../fetch'
import { RESULT_IMAGE_URL } from '../../config/common'
import { convertGenre, convertMonth } from '../../config/utils'
import { lazyImage } from '../lazyLoadImage'
import '../../component/loader.js'

const searchInput = $('#movie-search-input')
const searchMoviesContainer = $('#search-movies-container')

const createTitleResultElement = (movies) => {
    const { page, total_pages, total_results } = movies
    const titleContainer = $(
        '<div class="flex sm:flex-row flex-col text-left w-full sm:justify-between sm:items-center mt-16">'
    )

    const title = $(
        `<h1 class="text-base mb-5 lg:text-xl sm:mb-0 font-semibold tracking-wide">Hasil pencarian untuk : <span class="underline underline-offset-4 decoration-pink-500 decoration-4">${searchInput.val()}</span></h1>`
    )

    const counter = $(`<h1 class="text-sm lg:text-xl">
    Halaman ke-${page} dari ${total_pages} halaman
    </h1>`)

    titleContainer.append(title, counter)

    return titleContainer
}

const createCardResultElement = (movies, genres) => {
    // kerangka card untuk hasil pencarian
    const cardResultElement = movies?.map((item, index) => {
        const date = new Date(item?.release_date)
        const month = convertMonth(date.getUTCMonth())
        const year = date.getFullYear()
        const day = date.getDate()

        const stringGenres = convertGenre(genres, item?.genre_ids)

        const imagePath = `${RESULT_IMAGE_URL}/${item?.poster_path}`

        const wrapper = $(
            `<div class="w-full py-3 px-5 h-[20rem] bg-gradient-to-r from-pink-50 rounded-xl flex sm:flex-row flex-col gap-1 cursor-pointer transition duration-300 hover:scale-105">`
        )

        const imageContainer = $(
            `<div class="overflow-hidden relative h-full w-full sm:w-1/5">`
        )

        const image =
            $(`    <img class="lazy sm:w-max w-full sm:object-contain object-cover transition duration-700 sm:bg-center rounded-xl h-full" data-src="${imagePath}" alt="${item?.title}"/>
    `)
        imageContainer.append(image)

        // description container
        const descriptionContainer = $(
            `<div class="hidden  p-3 sm:flex flex-col h-full w-4/5 rounded-xl overflow-hidden">
            <h1 class="text-3xl font-bold tracking-wide">${item?.title}</h1>

            <div class="flex flex-col gap-1">
            <p class="text-sm">${year}</p>
            <p class="text-xs">${stringGenres.join(' / ')}</p>
            </div>

           <div class="mt-5 w-auto h-full">
            <p class="text-base">Overview :</p>
            <p class="text-sm lg:text-base line-clamp-4 text-justify leading-relaxed tracking-wide">${
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
    const titleResult = createTitleResultElement(movies)
    if (movies?.results?.length > 1) {
        const cardResult = createCardResultElement(movies?.results, genres)

        searchMoviesContainer.append(titleResult, cardResult)
    } else {
        const emptyResult = $(`<h1>Hasil tidak ditemukan</h1>`)
        searchMoviesContainer.append(titleResult, emptyResult)
    }
}

const searchResultElement = (movies, genres) => {
    searchMoviesContainer.empty()
    createResultMoviesComponent(movies, genres)
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
    // const LoaderComponent = document.createElement('loader-app')
    console.log(LoaderComponent)

    return searchMoviesContainer.append(LoaderComponent)
}

const createComponent = ({ response, genres = null }) => {
    createLoaderComponent()

    if (response?.results) {
        const timer = setTimeout(() => {
            searchResultElement(response, genres)
            $('.pagination').removeClass('hidden')
            document.getElementById('movie-list').scrollIntoView({
                behavior: 'smooth',
            })
            lazyImage()
            return clearTimeout(timer)
        }, 1000)
    }
}

export default function searchElementHandler({ response, genres }) {
    if (searchInput.val().length > 0) {
        searchInput.blur()

        createComponent({ response, genres })
    }
}
