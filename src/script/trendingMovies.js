import { TRENDING_IMAGE_URL } from '../config/common'
import { fetchData } from './fetch'

const path = '/trending/movie/week'
const trendingMovie = $('#trending-movies')

const getTrendingMovies = () => {
    const response = fetchData(path)
    return response
}

const createDivElement = (data) => {
    const movie = data.map((movie) => {
        const rating = Math.floor(movie?.vote_average)

        const container = $('<div>').addClass(
            'relative flex items-center justify-center group w-full h-full bg-white rounded-3xl overflow-hidden cursor-pointer transition duration-200 hover:scale-105'
        )
        const overlay = $('<div>').addClass(
            'absolute top-0 mt-20 right-3 lg:right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100'
        )

        // movie information
        const containerInfo = $('<div>').addClass(
            'absolute z-40 opacity-0 w-full h-1/2 px-2 flex items-center justify-center flex-col transition duration-300 translate-y-full group-hover:opacity-100 group-hover:translate-y-20'
        )

        const title = $('<h3>')
            .addClass('text-2xl font-bold text-center text-[#fff]')
            .text(movie?.title)

        const releaseDate = $('<h3>')
            .addClass('text-green-400 tracking-wide')
            .text(`Rating : ${rating}/10`)

        // append to container info
        containerInfo.append(title)
        containerInfo.append(releaseDate)

        const image = $(
            `<img src="${TRENDING_IMAGE_URL}${movie?.poster_path}" />`
        )

        // append to container card
        container.append(containerInfo)
        container.append(image)
        container.append(overlay)

        return container
    })
    return movie
}

const trendingMoviesElement = async () => {
    const trendingMovies = await getTrendingMovies()
    const slice = trendingMovies?.results?.slice(0, 4)

    const element = createDivElement(slice)

    trendingMovie.append(element)
}

export default trendingMoviesElement
