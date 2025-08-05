"use client"

import { useParams } from "next/navigation"
import css from "./NoteDetails.module.css"
import { useQuery } from "@tanstack/react-query"
import {fetchNotesById} from "@/lib/api"

export default function NoteDetailsClient() {
const params = useParams()
const id = Number(params.id)

const {data: note, error, isLoading} = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNotesById(id)
})

if (isLoading) return <p>Loading, please wait...</p>;
if (error || !note) return <p>Something went wrong.</p>;

    return (
        <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
	    <h2>Note title</h2>
	  </div>
	  <p className={css.content}>Note content</p>
	  <p className={css.date}>{new Date (note.createdAt).toLocaleString()}</p>
	</div>
</div>
    )
}