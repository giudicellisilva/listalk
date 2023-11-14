import api from "@/api/http-common";

export async function postLogin(login: string, password: string){
    return await api.post("realms/lmts/protocol/openid-connect/token",{
        client_id: "app_lmts",
        client_secret: "8S5xt4pa7tG4ynmnMX44mE063dKF890V",
        username: login,
        password: password,
        grant_type: "password",
    })
}  

