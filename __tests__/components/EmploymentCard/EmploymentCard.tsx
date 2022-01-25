import React from 'react'
import { render, screen } from '@testing-library/react'

import { EmploymentCard } from '../../../components'
import { RefType } from '../../../types'

describe('EmploymentCard', () => {
    test('renders component', () => {
        const ref = React.createRef<RefType>()
        render(
            <EmploymentCard
                ref={ref}
                monthlyNetIncome={0}
                annualNetIncome={0}
                monthlySuperGrossIncome={0}
                annualSuperGrossIncome={0}
                employeeContributions={[]}
                employerContributions={[]}
            />
        )

        expect(
            screen.getByRole('heading', { name: 'Zamestnanie' })
        ).toBeInTheDocument()
        expect(
            screen.getByText(
                'Vaše aktuálne príjmy a odvody na trvalom pracovnom pomere.'
            )
        ).toBeInTheDocument()
        expect(screen.getByText('Čistý mesačný príjem')).toBeInTheDocument()
        expect(screen.getByText('Odpracované mesiace')).toBeInTheDocument()
        expect(screen.getByText('Superhrubá mesačná mzda')).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Odvody zamestnanca' })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: 'Odvody zamestnávateľa' })
        ).toBeInTheDocument()
    })
})
