import api from "@/api/http-common";

export async function postList(name: string, description: string, category: string){
    return await api.post("/myList",{
        name: name,
        description: description,
        category: {
            id: category
        }
    })
}  