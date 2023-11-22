import api from "@/api/http-common";

export async function updateList(id: string | string[] | undefined, name: string, description: string, category: string){
    return await api.post(`/myList/${id}`,{
        name: name,
        description: description,
        category: {
            id: category
        }
    })
}  