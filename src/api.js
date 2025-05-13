import axios from "axios";

const myApiKey = import.meta.env.VITE_REACT_APP_UNSPLASH_API_KEY;

const requestParams = {
    orientation: "landscape",
    per_page: 15,
    content_filter: 'high',
}

export default async function getUnsplashData(additionalParams) {

    const response = await axios.get('https://api.unsplash.com/search/photos', {
        headers: {
            Authorization: `Client-ID ${myApiKey}`,
        },
        params: { ...requestParams, ...additionalParams },
    })

    return response.data;
}