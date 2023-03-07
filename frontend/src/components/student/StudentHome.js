import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getStudent } from '../../services/student.service'

export default function StudentHome() {
    const { authed } = useAuth()
    const [data, setData] = useState({})
    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        let res = await getStudent(authed._id)
        setData(res)
    }

    return (
        <div>
            <span style={{ fontSize: "2rem" }}>Hello, {authed?.name} !</span>
            {data ?
                <>
                    <p><span style={{ fontWeight: "bold" }}>Name: </span>{data.userId?.name}</p>
                    <p><span style={{ fontWeight: "bold" }}>Email: </span>{data.userId?.email}</p>
                    <p><span style={{ fontWeight: "bold" }}>Mobile: </span>{data.userId?.mobile}</p>
                    <p><span style={{ fontWeight: "bold" }}>College: </span>{data.userId?.collage}</p>
                    <p><span style={{ fontWeight: "bold" }}>Year: </span>{data.userId?.year}</p>
                    <p><span style={{ fontWeight: "bold" }}>Branch: </span>{data.userId?.branch}</p>
                    <p><span style={{ fontWeight: "bold" }}>Roll No.:</span>{data.userId?.rollno}</p>
                </> :
                <p>Your seesion expired! Please Login again</p>
            }
        </div>
    )
}
