import api from "@/api/http-common";

export async function postItens(id: string | string[] | undefined, content: string){
    return await api.post(`/myList/${id}/item`,{
        content: content
    });
}