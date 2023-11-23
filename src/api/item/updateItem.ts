import api from "@/api/http-common";

export async function updateItem(idList: string | string[] | undefined, idItem: string, content: string){
    return await api.post(`/myList/${idList}/item/${idItem}`,{
        content: content
    });
}