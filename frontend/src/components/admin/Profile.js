import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from 'react';
import { updateAdminProfile } from '../../services/admin.service';
import { useNavigate } from 'react-router-dom';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const Profile = () => {
    const { authed, setAuthed } = useAuth()
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log(values);
        let res = await updateAdminProfile(values)
        if (res) {
            console.log(res)
            setAuthed(res)
            navigate('/')
        }
    };

    return (
        <div>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
            >
                <Row>
                    <Col span={16} offset={8}>
                        <h3>Admin Profile</h3>
                    </Col>
                </Row>
                <Form.Item
                    name="name"
                    label="Name"
                >
                    <Input defaultValue={authed.name} />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input defaultValue={authed.email} />
                </Form.Item>
                <Form.Item
                    name="mobile"
                    label="Mobile"
                >
                    <Input defaultValue={authed.mobile} />
                </Form.Item>
                <Form.Item
                    name="college"
                    label="College"
                >
                    <Input defaultValue={authed.college} />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default Profile;

