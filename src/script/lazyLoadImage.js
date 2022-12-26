export function lazyImage() {
    const images = document.querySelectorAll('.lazy')

    const intersectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return

                intersectionObserver.unobserve(entry.target)

                const { src } = entry.target.dataset
                if (!src) return
                entry.target.src = src
            })
        },
        {
            rootMargin: '100px',
        }
    )

    images.forEach((image) => {
        intersectionObserver.observe(image)
    })
}
