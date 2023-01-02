import { fetchGenresList, fetchSearchMovie } from './fetch'
import searchElementHandler from './searchElement/searchElementHandler'

let currentPage = 1
let paginationSize = 5

function getPageList(totalPages, page, maxLength) {
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start)
    }

    let sideWidth = maxLength < 9 ? 1 : 2
    let leftWidth = (maxLength - sideWidth * 2 - 3) >> 1
    let rightWidth = (maxLength - sideWidth * 2 - 3) >> 1

    if (totalPages <= maxLength) {
        return range(1, totalPages)
    }

    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        return range(1, maxLength - sideWidth - 1).concat(
            0,
            range(totalPages - sideWidth + 1, totalPages)
        )
    }

    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        return range(1, sideWidth).concat(
            0,
            range(
                totalPages - sideWidth - 1 - rightWidth - leftWidth,
                totalPages
            )
        )
    }

    return range(1, sideWidth).concat(
        0,
        range(page - leftWidth, page + rightWidth),
        0,
        range(totalPages - sideWidth + 1, totalPages)
    )
}

// Function to fetch the data for a given page
export default async function fetchPage({ page = 1 }) {
    const { genres } = await fetchGenresList()
    currentPage = page
    // Make an API request to retrieve the data for the given page
    try {
        const value = $('#movie-search-input').val()
        const response = await fetchSearchMovie({ page, value })
        displayData({ response, genres })
        updatePagination(page, response.total_pages, genres)
    } catch (error) {
        console.log('something error happens', error.message)
    }

    // fetch(apiUrl + '?page=' + page + '&per_page=' + itemsPerPage)
    //     .then(function(response) {
    //         return response.json();
    //     })
    //     .then(function(data) {
    //         // Display the data for the current page
    //         displayData(data);

    //         // Update the pagination buttons
    //         updatePagination(page, data.total_pages);
    //     });
}

// Function to display the data for the current page
function displayData({ response, genres }) {
    const value = $('#movie-search-input').val()
    // Clear the current data
    searchElementHandler({ response, genres, value })
}

// Function to update the pagination buttons
function updatePagination(page, totalPages, genres) {
    // Clear the current pagination buttons
    $('.pagination').empty()

    // Generate the pagination buttons
    // for (var i = 1; i <= totalPages; i++) {
    //     $('.pagination').append('<a href="#" class="page-number">' + i + '</a>')
    // }

    const paginationComp = getPageList(
        totalPages,
        currentPage,
        paginationSize
    ).map((item) => {
        return $('<li>')
            .addClass('page-item hover:bg-pink-100 transition duration-200')
            .addClass(item ? 'current-page' : 'dots')
            .toggleClass('active', item === currentPage)
            .append(
                $('<a>')
                    .addClass('page-link')
                    // .attr({ href: 'javascript:void(0)' })
                    .text(item || '...')
            )
            .insertBefore('.next-page')
    })

    const render = paginationComp.map((item) => {
        return item?.prevObject
    })

    // $('.pagination').append(paginationComp)
    $('.pagination').append(render)

    $('.previous-page').toggleClass('disable', currentPage === 1)
    $('.next-page').toggleClass('disable', currentPage === totalPages)

    // Set the active class on the current button
    // $('#pagination a.page-number:nth-child(' + page + ')').addClass('active')

    // Handle clicks on the pagination buttons
    $(`.pagination li.current-page`).on('click', function (e) {
        e.preventDefault()

        // Set the current page to the button's page number
        currentPage = +$(this).children().text()
        // Fetch the data for the current page
        fetchPage({ page: currentPage })
    })

    //  $('.next-page').on('click', function () {
    //         showPage(currentPage + 1)
    //         return fetchSearchMovie(currentPage)
    //     })

    //     $('.previous-page').on('click', function () {
    //         showPage(currentPage - 1)
    //         return fetchSearchMovie(currentPage)
    //     })
}

// Fetch the data for the first page
// fetchPage(1)
