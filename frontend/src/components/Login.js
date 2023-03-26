import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
    const { login } = useAuth()
    const [isAdmin, setIsAdmin] = useState(false)
    const navigate = useNavigate()

    const onFinish = async (values) => {
        let res = await login(values.email, values.password)
        console.log('Received values of form: ', res);
        if (res.message) {
            message.error(res.message);
        } else {
            isAdmin ? navigate('/admin') : navigate('/student')
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "400px",
            height: "100vh",
            margin: "auto"
        }}>
            <h2>{isAdmin ? "Admin" : "Student"} Login</h2>
            <Form
                name="normal_login"
                className="login-form"

                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="email" type='email' />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ width: "100%" }}>
                        Login
                    </Button>
                    {/* <Divider plain></Divider> */}
                    {!isAdmin && <p style={{ textAlign: "start" }}>
                        New to the system? <a href="/register" >register now!</a>
                    </p>}
                </Form.Item>
                <Divider plain>Or</Divider>
                <Button type='link' style={{ width: "100%" }} onClick={() => setIsAdmin(!isAdmin)}>Login as {isAdmin ? "student" : "admin"}</Button>
            </Form>
        </div>
    );
};
