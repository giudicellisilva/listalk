import api from "@/api/http-common";

export async function getLists(){
    return await api.get("/myList")
}  
