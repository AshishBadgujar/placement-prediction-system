import { Button, Col, Divider, Form, Row, Spin, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { getPackageRange } from '../../../services/student.service'

const { Text } = Typography;

export default function Fifth({ isLoading, student, courses, weakPoint }) {
    const [range, setRange] = useState('')
    useEffect(() => {
        setRange(getPackageRange(student?.packageRange))
    }, [isLoading])

    return (
        <div>
            {student ?
                student.placementStatus ?
                    <Row>
                        <Col span={16} offset={9}>
                            <div>
                                <img src='/happy.svg' alt='happy' style={{ height: "13rem", width: "auto" }} />
                                <h4>Congratulations!!!</h4>
                                <p>As per our model's prediction you are going to be placed, and your salary range would be: </p>
                                <h4>{range}</h4>
                            </div>
                        </Col>
                    </Row>

                    :
                    <Row>
                        <Col span={16} offset={9}>
                            <div>
                                <img src='/sad.svg' alt='sad' style={{ height: "13rem", width: "auto" }} />
                                <p>Oh!!!</p>
                                <p>As per our model's prediction you are not going to be placed, you need to improve your skills and study hard to get job, Good luck!</p>
                                <Divider />
                                Your weak point is <Text type="danger">{weakPoint}</Text>
                                <br />
                                <Text strong >Here are some cources which you can prefer to cover up your weak points</Text>
                                <p style={{ whiteSpace: "pre-line" }}>{courses}</p>
                            </div>
                        </Col>
                    </Row>

                :
                <Form.Item
                    wrapperCol={{
                        offset: 9,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Start Prediction
                    </Button>
                </Form.Item>
            }
            {isLoading && <div style={{ textAlign: "center" }}><Spin size="large" /></div>}
        </div>
    )
}
