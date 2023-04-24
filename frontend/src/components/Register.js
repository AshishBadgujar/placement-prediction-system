import { Button, Col, Form, Input, Row, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { regitrationReq } from '../services/student.service';

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const Register = () => {
    const navigate = useNavigate()
    const onFinish = async (values) => {
        console.log(values);
        let res = await regitrationReq(values)
        if (res.status) {
            message.success("successfully requested")
            navigate('/login')
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
                        <h2>Registration Request</h2>
                    </Col>
                </Row>

                <Form.Item
                    name="name"
                    label="Name"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                            required: true
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="mobile"
                    label="Mobile"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="college"
                    label="College"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="year"
                    label="Year"
                    required
                >
                    <Input placeholder='1,2,3,4 etc.' />
                </Form.Item>
                <Form.Item
                    name="branch"
                    label="Branch"
                    required
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="rollno"
                    label="Roll No"
                    required
                >
                    <Input />
                </Form.Item>
                <Row>
                    <Col span={16} offset={8}>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                        <p>
                            Already have account? <a href="/login" >Login!</a>
                        </p>
                    </Col>
                </Row>

            </Form>
        </div>
    )
};
export default Register;