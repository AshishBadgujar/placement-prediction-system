import React from 'react'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import { changePassword } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export default function ChangePw() {
    const navigate = useNavigate()

    const onFinish = async (values) => {
        let res = await changePassword(values)
        if (res) navigate('/')
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Row>
                <Col span={16} offset={8}>
                    <h3>Change Password</h3>
                </Col>
            </Row>
            <Form.Item
                label="Old Password"
                name="oldPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please input your old password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="New Password"
                name="newPassword"
                rules={[
                    {
                        required: true,
                        message: 'Please input your new password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form.Item>
        </Form>
    )
}
