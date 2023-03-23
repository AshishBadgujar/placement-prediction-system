import { Descriptions, Divider } from 'antd'
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
            <div style={{ marginTop: "2rem" }}>
                <Divider />
                {data ?
                    <>
                        <Descriptions title="Basic Details">
                            <Descriptions.Item label="Name">{data.userId?.name}</Descriptions.Item>
                            <Descriptions.Item label="Email">{data.userId?.email}</Descriptions.Item>
                            <Descriptions.Item label="Mobile">{data.userId?.mobile}</Descriptions.Item>
                            <Descriptions.Item label="College">{data.userId?.college}</Descriptions.Item>
                            <Descriptions.Item label="Year">{data.userId?.year}</Descriptions.Item>
                            <Descriptions.Item label="Branch">{data.userId?.branch}</Descriptions.Item>
                            <Descriptions.Item label="Roll No">{data.userId?.rollno}</Descriptions.Item>
                        </Descriptions>
                        <Divider />
                        {data.qa &&
                            <>
                                <Descriptions title="Soft skill Test Results">
                                    <Descriptions.Item label="Quantitative Aptitude">{data.qa}</Descriptions.Item>
                                    <Descriptions.Item label="Logical Reasoning">{data.lr}</Descriptions.Item>
                                    <Descriptions.Item label="Verbal Ability">{data.va}</Descriptions.Item>
                                    <Descriptions.Item label="Programming">{data.programming}</Descriptions.Item>
                                </Descriptions>
                                <Divider />
                                <Descriptions title="Academic Details">
                                    <Descriptions.Item label="Operating System">{data.os}</Descriptions.Item>
                                    <Descriptions.Item label="Computer Networks">{data.cn}</Descriptions.Item>
                                    <Descriptions.Item label="Data Stuctures & Algo">{data.dsa}</Descriptions.Item>
                                    <Descriptions.Item label="Machine Learning">{data.ml}</Descriptions.Item>
                                    <Descriptions.Item label="Object Orianted Programming">{data.oop}</Descriptions.Item>
                                    <Descriptions.Item label="Database Management System">{data.dbms}</Descriptions.Item>
                                    <Descriptions.Item label="Aggregate CGPA">{data.cgpa}</Descriptions.Item>
                                </Descriptions>
                                <Divider />
                                <Descriptions title="Other Details">
                                    <Descriptions.Item label="Active backlogs">{data.activeBacklogs}</Descriptions.Item>
                                    <Descriptions.Item label="Dead backlogs">{data.deadBacklogs}</Descriptions.Item>
                                    <Descriptions.Item label="Certifications">{data.cert}</Descriptions.Item>
                                    <Descriptions.Item label="Internships">{data.internship}</Descriptions.Item>
                                </Descriptions>

                            </>
                        }
                    </>
                    :
                    <p>Your seesion expired! Please Login again</p>
                }
            </div>
        </div>
    )
}
