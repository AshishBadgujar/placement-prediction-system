import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Card } from 'antd';
import { getAllStudents, getStudentReq } from '../../services/admin.service';
import PieChart from './PieChart';

export default function AdminHome() {
    const { authed } = useAuth()
    const [req, setReq] = useState(0)
    const [stud, setStud] = useState(0)
    const [count, setCount] = useState([0, 0, 0])

    useEffect(() => {
        getReq()
        getStudents()
    }, [])
    const getStudents = async () => {
        let res = await getAllStudents()
        setStud(res.length)
        console.log(res)
        let yes = 0, no = 0, noCheck = 0;
        if (res.length > 0) {
            no = res.filter(item => item.placementStatus == 0).length;
            yes = res.filter(item => item.placementStatus == 1).length;
            noCheck = res.length - (yes + no)
            setCount([no, yes, noCheck])
        }

    }
    const getReq = async () => {
        let res = await getStudentReq()
        setReq(res.length)
    }
    return (
        <div>
            <span style={{ fontSize: "2rem" }}>Hello, {authed?.name} !</span>
            <div style={{ paddingTop: "1rem", display: 'flex', flexWrap: "wrap" }}>
                <Card
                    hoverable
                    style={{
                        width: 240,
                        marginRight: "1rem",
                        marginBottom: "1rem",
                        textAlign: "center"
                    }}
                >
                    <span style={{ fontSize: "1.2rem" }}>Regitration Requests</span>
                    <p style={{ fontSize: "3rem" }}>{req}</p>
                </Card>
                <Card
                    hoverable
                    style={{
                        width: 240,
                        marginRight: "1rem",
                        marginBottom: "1rem",
                        textAlign: "center"
                    }}
                >
                    <span style={{ fontSize: "1.2rem" }}>Students</span>
                    <p style={{ fontSize: "3rem" }}>{stud}</p>
                </Card>
                <PieChart count={count} />
            </div>
        </div>
    )
}
