import React from 'react'
import IndividualTest from './IndividualTest';
import Tabulation from './Tabulation'

function ResultAll () {
    return (
        <React.Fragment>
            <Tabulation />
            <IndividualTest />
        </React.Fragment>
    )
}

export default ResultAll;