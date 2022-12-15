export const convertMonth = (integer) => {
    let month = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ]
    return month[integer - 1]
}

export const convertDay = (integer) => {
    let day = ['Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu', 'Minggu']

    return day[integer - 1]
}

export const convertGenre = (genres, ids) => {
    const converted = ids.map((item) => {
        const { name } = genres.find((genre) => genre.id === item)
        return name
    })

    return converted
}
