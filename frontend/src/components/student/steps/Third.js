import React from 'react'
import NumberIn from '../../NumberIn'

export default function Third() {
    return (
        <div>
            <NumberIn label="Operating System" name="os" max={100} />
            <NumberIn label="Computer Networks" name="cn" max={100} />
            <NumberIn label="Data Stuctures & Algo" name="dsa" max={100} />
            <NumberIn label="Machine Learning" name="ml" max={100} />
            <NumberIn label="Object Orianted Programming" name="oop" max={100} />
            <NumberIn label="Database Management System" name="dbms" max={100} />
            <NumberIn label="Aggregate CGPA" name="cgpa" max={10} />
        </div>
    )
}
