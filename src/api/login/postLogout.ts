import api from "@/api/http-common-keycloak";

export async function postLogout(){
    return await api.post("realms/lmts/protocol/openid-connect/token",{
        client_id: "app_lmts",
        client_secret: "Zlz3mGMEuuWGXAlUSjUE72qI0xZsaTPk",
    })
}  