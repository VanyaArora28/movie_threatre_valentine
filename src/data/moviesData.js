// Movie data for all 8 days (Feb 7-14, 2026)
export const moviesData = [
    {
        day: 7,
        date: 'FEB 7',
        title: 'Falling in Love',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Falling_in_love_poster.jpg',
        gameType: 'morse-code',
        photos: [
            '/images/placeholders/feb7-photo1.jpg',
            '/images/placeholders/feb7-photo2.jpg'
        ]
    },
    {
        day: 8,
        date: 'FEB 8',
        title: 'A Christmas Prince',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/7/72/A_Christmas_Prince.png',
        gameType: 'royal-quiz',
        photos: [
            '/images/placeholders/feb8-photo1.jpg',
            '/images/placeholders/feb8-photo2.jpg'
        ]
    },
    {
        day: 9,
        date: 'FEB 9',
        title: 'Sita Ramam',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0d/Sita_Ramam_poster.jpg',
        gameType: 'scratch-off',
        photos: [
            '/images/placeholders/feb9-photo1.jpg',
            '/images/placeholders/feb9-photo2.jpg'
        ]
    },
    {
        day: 10,
        date: 'FEB 10',
        title: 'La Dolce Villa',
        posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjU2Nzg5MTEwMF5BMl5BanBnXkFtZTgwNTA1NzY3NTM@._V1_.jpg',
        gameType: 'gelato-builder',
        photos: [
            '/images/placeholders/feb10-photo1.jpg',
            '/images/placeholders/feb10-photo2.jpg'
        ]
    },
    {
        day: 11,
        date: 'FEB 11',
        title: 'Murder on the Orient Express',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c6/Murder_on_the_Orient_Express_%282017_film_poster%29.png',
        gameType: 'logic-puzzle',
        photos: [
            '/images/placeholders/feb11-photo1.jpg',
            '/images/placeholders/feb11-photo2.jpg'
        ]
    },
    {
        day: 12,
        date: 'FEB 12',
        title: 'Queen',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/45/QueenMoviePoster7thMarch.jpg',
        gameType: 'golgappa-clicker',
        photos: [
            '/images/placeholders/feb12-photo1.jpg',
            '/images/placeholders/feb12-photo2.jpg'
        ]
    },
    {
        day: 13,
        date: 'FEB 13',
        title: 'Jab We Met',
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Jab_We_Met_Poster.jpg',
        gameType: 'train-runner',
        photos: [
            '/images/placeholders/feb13-photo1.jpg',
            '/images/placeholders/feb13-photo2.jpg'
        ]
    },
    {
        day: 14,
        date: 'FEB 14',
        title: 'The Grand Premiere',
        posterUrl: null, // Special day, no poster
        gameType: 'premiere',
        photos: [] // Uses filmstrip gallery instead
    }
]

export function getMovieByDay(day) {
    return moviesData.find(movie => movie.day === day)
}
