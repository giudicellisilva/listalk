
import api from "@/api/http-common";

export async function getCategory(){
    return await api.get("/category");
}  
