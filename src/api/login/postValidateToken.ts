import api from "@/api/http-common-keycloak";

export async function postValidateToken(token: string){
    return await api.post("realms/lmts/protocol/openid-connect/token/introspect",{
        client_id: "app_lmts",
        client_secret: "Zlz3mGMEuuWGXAlUSjUE72qI0xZsaTPk",
        token: token
    })
}  

