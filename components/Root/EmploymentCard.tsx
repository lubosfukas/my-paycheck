import { forwardRef } from 'react'

import { ContributionsTable, IncomeCard } from '../common'
import { Contributions, RefType } from '../../types'

type Props = {
    employeeContributions: Contributions
    employerContributions: Contributions
    monthlyNetIncome: number
    monthlySuperGrossIncome: number
    monthsWorked?: number
}

export const EmploymentCard = forwardRef<RefType, Props>(
    (
        {
            monthlySuperGrossIncome: annualSuperGrossIncome,
            monthlyNetIncome,
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
                    label: 'Superhrubý mesačný príjem',
                    value: annualSuperGrossIncome,
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
