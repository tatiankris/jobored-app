import axios from "axios"

export const access_token = localStorage.getItem('access_token')

export const instanceAuth = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0/',
    withCredentials: true,
    headers: {
        'X-Secret-Key': 'GEU4nvd3rej*jeh.eqp'
    }
})
export const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/2.0/',
    withCredentials: true,
    headers: {
        'X-Secret-Key': 'GEU4nvd3rej*jeh.eqp',
        'Authorization': `Bearer ${access_token}`,
        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
    }
})


