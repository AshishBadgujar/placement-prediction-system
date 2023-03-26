import { Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { regitrationReq } from '../services/student.service';

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
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
            >

                <h2 style={{ textAlign: "center" }}>Regitration Request</h2>

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
                <Form.Item style={{ textAlign: "center" }}>
                    <Button type="primary" htmlType="submit" >
                        Submit
                    </Button>
                    <p style={{ textAlign: "start" }}>
                        Already have account? <a href="/login" >Login!</a>
                    </p>
                </Form.Item>
            </Form>
        </div>
    )
};
export default Register;