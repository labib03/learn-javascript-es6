import { fetchData } from './fetch'
import { RESULT_IMAGE_URL } from './../config/common'
import { convertGenre, convertMonth } from './../config/utils'

const searchInput = $('#movie-search-input')
const searchForm = $('#movie-search-form')
const path = '/search/movie'
const searchMoviesContainer = $('#search-movies-container')

const searchResultElement = (movies, genres) => {
    searchMoviesContainer.empty()
    if (movies.length > 1) {
        const titleContainer = $('<div>').addClass('mt-16')
        const title = $('<h1>')
            .addClass('text-xl font-semibold tracking-wide')
            .text(`Hasil pencarian untuk : ${searchInput.val()}`)

        // kerangka card untuk hasil pencarian
        const cardResultElement = movies.map((item, index) => {
            const date = new Date(item?.release_date)
            const month = convertMonth(date.getUTCMonth())
            const year = date.getFullYear()
            const day = date.getDate()

            const stringGenres = convertGenre(genres, item?.genre_ids)

            const container = $(
                `<div class="w-full group py-3 px-5 h-[20rem] backdrop-blur-md bg-gradient-to-r from-pink-50 rounded-xl flex gap-1 cursor-pointer transition duration-300 hover:scale-105">`
            )
            const image = $(`<div class="overflow-hidden h-full w-1/5">
        <img class="w-max object-contain group-hover:scale-105 transition duration-700 bg-center rounded-xl h-full" src="${RESULT_IMAGE_URL}/${item?.poster_path}" alt="${item?.title}"/>
        </div>`)

            // description container
            const descriptionContainer = $(
                `<div class="p-3 flex flex-col h-full w-4/5 rounded-xl overflow-hidden">
                <h1 class="text-3xl font-bold tracking-wide">${item?.title}</h1>

                <div class="flex flex-col gap-1">
                <p class="text-sm">${year}</p>
                <p class="text-xs">${stringGenres.join(' / ')}</p>
                <p class="text-xs">Adult film : ${
                    item?.adult ? 'Yes' : 'No'
                }</p>
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
            // container.append(image, descriptionContainer)

            const loader = $(`
        <div class="flex items-center justify-center w-full h-full">
	<div class="flex justify-center items-center space-x-1 text-sm text-gray-700">

				<svg fill='none' class="w-6 h-6 animate-spin" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
					<path clip-rule='evenodd'
						d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
						fill='currentColor' fill-rule='evenodd' />
				</svg>


		<div>Loading ...</div>
	</div>
</div>`)

            container.append(loader)

            setTimeout(() => {
                container.empty()
                container.append(image, descriptionContainer)
                return container
            }, 1500)

            return container
        })

        titleContainer.append(title)
        searchMoviesContainer.append(titleContainer, cardResultElement)
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
            const { results } = await fetchData(path, { query: value })

            searchResultElement(results, genres)
        }

        return
    })
}

export default searchElement
