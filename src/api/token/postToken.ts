import api from "@/api/http-common";

export async function postToken(){
    return await api.post("realms/SpringBootKeycloak/protocol/openid-connect/token",{
        client_id: "7da14ff0-bfc0-47f5-a009-1a04352ef805",
        username: "Giu",
        password: "123",
        grant_type: "password",
    })
}  