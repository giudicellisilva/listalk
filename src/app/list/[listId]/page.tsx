"use client";

import List from "@/components/List"
import {useParams} from "next/navigation";

const PageList = () =>{
    const params = useParams();
    return(
        <List id={params.listId} />
    )
}

export default PageList;