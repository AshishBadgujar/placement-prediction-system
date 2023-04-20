import { Col, Descriptions, Divider, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getStudent } from '../../services/student.service'
import BarChart from './BarChart'

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
                                <Row style={{ height: 300 }}>
                                    <Col span={12}>
                                        <BarChart title="Academic Details" labels={["Operating System", "Computer Networks", "Data Stuctures & Algo", "Machine Learning", "Object Orianted Programming", "Database Management System"]} dataArray={[data.os, data.cn, data.dsa, data.ml, data.oop, data.dbms]} />
                                    </Col>
                                    <Col span={12}>
                                        <BarChart title="Soft skill Test Results" labels={["Quantitative Aptitude", "Logical Reasoning", "Verbal Ability", "Programming"]} dataArray={[data.qa, data.lr, data.va, data.programming]} />
                                    </Col>
                                </Row>
                                <Row>

                                    <Divider />
                                    <Descriptions title="Other Details">
                                        <Descriptions.Item label="Aggregate CGPA">{data.cgpa}</Descriptions.Item>
                                        <Descriptions.Item label="Active backlogs">{data.activeBacklogs}</Descriptions.Item>
                                        <Descriptions.Item label="Dead backlogs">{data.deadBacklogs}</Descriptions.Item>
                                        <Descriptions.Item label="Certifications">{data.cert}</Descriptions.Item>
                                        <Descriptions.Item label="Internships">{data.internship}</Descriptions.Item>
                                    </Descriptions>
                                </Row>

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
