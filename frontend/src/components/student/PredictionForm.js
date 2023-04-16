import { Button, Col, Form, Input, message, Row, Steps, theme } from 'antd';
import { useState } from 'react';
import Fifth from './steps/Fifth';
import First from './steps/First';
import Fourth from './steps/Fourth';
import Second from './steps/Second';
import Third from './steps/Third';
import { getPredictions } from '../../services/student.service';
import { useAuth } from '../../hooks/useAuth';

const PredictionForm = () => {
    const { authed } = useAuth()
    const [stepForm] = Form.useForm();
    const [isLoading, setIsLoading] = useState(false)
    const [student, setStudent] = useState()
    const [courses, setCourses] = useState('')
    const [weakPoint, setWeakPoint] = useState('')
    const steps = [
        {
            tt: 'Test Your Knowledge',
            content: <First />,
        },
        {
            tt: 'Soft skill Test Results',
            content: <Second />,
        },
        {
            tt: 'Academic Details',
            content: <Third />,
        },
        {
            tt: 'Other Details',
            content: <Fourth />,
        },
        {
            tt: 'Placement Prediction',
            content: <Fifth isLoading={isLoading} student={student} courses={courses} weakPoint={weakPoint} />,
        },
    ];
    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));

    const onFinish = async () => {
        setIsLoading(true)
        const formData = stepForm.getFieldsValue(true);
        delete formData.remember
        console.log(formData);
        let res = await getPredictions(authed?._id, formData)
        console.log(res)
        if (res) {
            setStudent(res.student)
            setCourses(res.courses)
            setWeakPoint(res.weakPoint)
            setIsLoading(false)
        }
    }
    return (
        <>
            <Steps current={current} items={items} />
            <Form
                form={stepForm}
                name="basic"
                labelCol={{
                    span: 9,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                    padding: "1rem"
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                preserve={true}
                autoComplete="off"
            >
                <Row>
                    <Col span={16} offset={9}>
                        <h3>{steps[current].tt}</h3>
                    </Col>
                </Row>
                <div >{steps[current].content}</div>
            </Form>
            <div
                style={{
                    marginTop: 24,
                }}
            >
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {/* {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )} */}
                {current > 0 && !isLoading && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        Previous
                    </Button>
                )}
            </div>
        </>
    );
};
export default PredictionForm;