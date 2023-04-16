import React from 'react'
import NumberIn from '../../NumberIn'
import { Form, Input } from 'antd'

export default function Second() {
    return (
        <div>
            <NumberIn label="Quantitative Aptitude" name="qa" max={20} />
            <NumberIn label="Logical Reasoning" name="lr" max={20} />
            <NumberIn label="Verbal Ability" name="va" max={20} />
            <Form.Item
                label="Programming Language"
                name="progLang"
            >
                <Input />
            </Form.Item>
            <NumberIn label="Programming" name="programming" max={20} />
        </div>
    )
}
