import React from 'react'
import NumberIn from '../../NumberIn'

export default function Second() {
    return (
        <div>
            <NumberIn label="Quantitative Aptitude" name="qa" max={20} />
            <NumberIn label="Logical Reasoning" name="lr" max={20} />
            <NumberIn label="Verbal Ability" name="va" max={20} />
            <NumberIn label="Programming" name="programming" max={20} />
        </div>
    )
}
