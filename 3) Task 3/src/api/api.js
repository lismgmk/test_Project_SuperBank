const {REACT_APP_BASE_URL} = process.env

export default function api() {
    return fetch(REACT_APP_BASE_URL)
}