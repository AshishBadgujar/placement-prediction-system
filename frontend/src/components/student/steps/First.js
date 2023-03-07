import { Col, Row } from 'antd'
import React from 'react'

export default function First() {
    return (
        <Row>
            <Col span={16} offset={8}>
                <ul>
                    <li><a href="https://www.indiabix.com/online-test/aptitude-test/">Quantitative Aptitude</a>
                    </li>
                    <li>
                        <a href="https://www.indiabix.com/online-test/logical-reasoning-test/">Logical Reasoning</a>
                    </li>
                    <li>
                        <a href="https://www.indiabix.com/online-test/verbal-ability-test/">Verbal ability</a>
                    </li>
                    <li>
                        <p>Programming (Choose your prefered Programming language)</p>
                    </li>
                    <ul>
                        <li><a href="https://www.indiabix.com/online-test/c-programming-test/">C Programming
                            test</a>
                        </li>
                        <li>
                            <a href="https://www.indiabix.com/online-test/c-sharp-programming-test/">C# Programming
                                test</a>
                        </li>
                        <li>
                            <a href="https://www.indiabix.com/online-test/cpp-programming-test/">C++ Programming
                                test</a>
                        </li>
                        <li>
                            <a href="https://www.indiabix.com/online-test/java-programming-test/">Java Programming
                                test</a>
                        </li>
                    </ul>
                </ul>
            </Col>
        </Row>
    )
}
