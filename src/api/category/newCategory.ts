import api from "@/api/http-common";

export async function newCategory(name: string){
    return await api.post("category",{
        name: name
    })
}  

