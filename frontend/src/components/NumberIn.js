import { Form, InputNumber } from 'antd'
import React from 'react'

export default function NumberIn({ label, name, max }) {
    return (
        <Form.Item
            label={label}
            name={name}
            rules={[
                {
                    type: 'number',
                    min: 0,
                    max: max,
                },
            ]}
            initialValue={0}
        >
            <InputNumber style={{ width: "100%" }} />
        </Form.Item>
    )
}
