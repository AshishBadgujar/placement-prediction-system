import { Button, Col, Form, Row, Spin } from 'antd'
import React from 'react'
export default function Fifth({ isLoading, student }) {
    return (
        <div>
            {student ?
                student.placementPrediction ?
                    <Row>
                        <Col span={16} offset={9}>
                            <div>
                                <img src='/happy.svg' alt='happy' style={{ height: "13rem", width: "auto" }} />
                                <p>Congratulations!!!</p>
                                <p>As per our model's prediction you are going to be placed, stay tuned to know your salary range we are working on it.

                                </p>
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
