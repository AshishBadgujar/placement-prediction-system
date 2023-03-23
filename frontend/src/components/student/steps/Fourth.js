import { Form, Input } from 'antd'
import React from 'react'
import NumberIn from '../../NumberIn'

export default function Fourth() {
    return (
        <div>
            <NumberIn label="Active backlogs" name="activeBacklogs" />
            <NumberIn label="Dead backlogs" name="deadBacklogs" />
            <Form.Item
                label="Certifications done(if any)"
                name="cert"
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Internships done(if any)"
                name="internship"
            >
                <Input />
            </Form.Item>
        </div>
    )
}
