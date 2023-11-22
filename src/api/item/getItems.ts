import api from "@/api/http-common";

export async function getItens(id: string | string[] | undefined){
    return await api.get(`/myList/${id}/item`);
}