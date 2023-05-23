import {instance} from "./request-instances"

export const authAPI = {

    getAuth() {
        return instance.get<AuthResponseType>("oauth2/password/", {
            params: {
                login: 'sergei.stralenia@gmail.com',
                password: 'paralect123',
                client_id: 2356,
                client_secret: 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
                hr: 0
            }
        })
    }
}
type AuthResponseType = {
    access_token: string
    refresh_token: string
    ttl: number
    expires_in: number
    token_type: string
}