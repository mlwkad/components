export default function debounce(func, t) {
    let timer

    return () => {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            func()
        }, t);

    }
}