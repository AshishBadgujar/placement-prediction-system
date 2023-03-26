import React from 'react'
import NumberIn from '../../NumberIn'

export default function Third() {
    return (
        <div>
            <NumberIn label="Operating System" name="os" max={10} />
            <NumberIn label="Computer Networks" name="cn" max={10} />
            <NumberIn label="Data Stuctures & Algo" name="dsa" max={10} />
            <NumberIn label="Machine Learning" name="ml" max={10} />
            <NumberIn label="Object Orianted Programming" name="oop" max={10} />
            <NumberIn label="Database Management System" name="dbms" max={10} />
            <NumberIn label="Aggregate CGPA" name="cgpa" max={10} />
        </div>
    )
}
