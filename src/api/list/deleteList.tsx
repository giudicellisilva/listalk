import api from "@/api/http-common";

export async function deleteList(id: string){
    return await api.delete(`/myList/${id}`);
}