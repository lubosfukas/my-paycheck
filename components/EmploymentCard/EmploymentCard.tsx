import { forwardRef } from 'react'
import { EmployeeContributionsTable } from './EmployeeContributionsTable'
import { EmployerContributionsTable } from './EmployerContributionsTable'
import { IncomeCard } from '../common'
import { texts } from '../../utils/texts'
import {
    EmployeeContributions,
    EmployerContributions,
    RefType,
} from '../../types'

type Props = {
    monthlyNetIncome: number
    annualNetIncome: number
    monthlySuperGrossIncome: number
    annualSuperGrossIncome: number
    isSeverelyDisabled: boolean
    employeeContributions: EmployeeContributions
    employerContributions: EmployerContributions
    monthsWorked?: number
}

export const EmploymentCard = forwardRef<RefType, Props>(
    (
        {
            monthlyNetIncome,
            monthlySuperGrossIncome,
            isSeverelyDisabled,
            employeeContributions,
            employerContributions,
            monthsWorked = 12,
        },
        ref
    ) => (
        <IncomeCard
            ref={ref}
            title={texts['employmentCard.title']}
            description={texts['employmentCard.description']}
            content={[
                {
                    label: texts['employmentCard.monthlyNetIncome'],
                    value: monthlyNetIncome,
                    cash: true,
                    colored: true,
                },
                {
                    label: texts['employmentCard.monthsWorked'],
                    value: monthsWorked,
                    cash: false,
                    colored: false,
                },
                {
                    label: texts['employmentCard.monthlySuperGrossIncome'],
                    value: monthlySuperGrossIncome,
                    cash: true,
                    colored: false,
                },
            ]}
            additional={[
                {
                    id: 'employee-contributions',
                    label: texts['employmentCard.employeeContributions'],
                    content: (
                        <EmployeeContributionsTable
                            monthsWorked={monthsWorked}
                            isSeverelyDisabled={isSeverelyDisabled}
                            {...employeeContributions}
                        />
                    ),
                },
                {
                    id: 'employer-contributions',
                    label: texts['employmentCard.employerContributions'],
                    content: (
                        <EmployerContributionsTable
                            monthsWorked={monthsWorked}
                            isSeverelyDisabled={isSeverelyDisabled}
                            {...employerContributions}
                        />
                    ),
                },
            ]}
        />
    )
)

EmploymentCard.displayName = 'EmploymentCard'
