import { forwardRef } from 'react'

import { ContributionsTable } from '../ContributionsTable'
import { IncomeCard } from '../IncomeCard'
import { Contributions, RefType } from '../../types'

type Props = {
    monthlyNetIncome: number
    annualNetIncome: number
    monthlySuperGrossIncome: number
    annualSuperGrossIncome: number
    employeeContributions: Contributions
    employerContributions: Contributions
    monthsWorked?: number
}

export const EmploymentCard = forwardRef<RefType, Props>(
    (
        {
            monthlyNetIncome,
            monthlySuperGrossIncome,
            employeeContributions,
            employerContributions,
            monthsWorked = 12,
        },
        ref
    ) => (
        <IncomeCard
            ref={ref}
            title="Zamestnanie"
            description="Vaše aktuálne príjmy a odvody na trvalom pracovnom pomere."
            content={[
                {
                    label: 'Čistý mesačný príjem',
                    value: monthlyNetIncome,
                    cash: true,
                    colored: true,
                },
                {
                    label: 'Odpracované mesiace',
                    value: monthsWorked,
                    cash: false,
                    colored: false,
                },
                {
                    label: 'Superhrubá mesačná mzda',
                    value: monthlySuperGrossIncome,
                    cash: true,
                    colored: false,
                },
            ]}
            additional={[
                {
                    id: 'employee-contributions',
                    label: 'Odvody zamestnanca',
                    content: (
                        <ContributionsTable
                            id="employee-contributions"
                            contributions={employeeContributions}
                        />
                    ),
                },
                {
                    id: 'employer-contributions',
                    label: 'Odvody zamestnávateľa',
                    content: (
                        <ContributionsTable
                            id="employer-contributions"
                            contributions={employerContributions}
                        />
                    ),
                },
            ]}
        />
    )
)

EmploymentCard.displayName = 'EmploymentCard'
