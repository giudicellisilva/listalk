import api from "@/api/http-common";

export async function getList(){
    return await api.get("/myList")
}  
