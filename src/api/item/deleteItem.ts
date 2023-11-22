import api from "@/api/http-common";

export async function deleteItem(idList: string | string[] | undefined, idItem: string){
    return await api.delete(`/myList/${idList}/item/${idItem}`)
}