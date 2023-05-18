import axios from "axios"
import {accessTokenObj} from "./access-token"

export const instance = axios.create({
    baseURL: 'https://startup-summer-2023-proxy.onrender.com/',
    withCredentials: true,
    headers: {
        'X-Secret-Key': 'GEU4nvd3rej*jeh.eqp',
        // 'Host': 'startup-summer-2023-proxy.onrender.com',
        // 'x-secret-key': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
        'Authorization': `${accessTokenObj.token_type} ${accessTokenObj.access_token}`,
        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948'
    }
})


