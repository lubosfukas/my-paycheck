import { forwardRef } from 'react'
import { EmployerContributionsTable } from './EmployerContributionsTable'
import { ContributionsTable, ContributionsTableMobile } from '../common'
import { IncomeCard } from '../common'
import { texts } from '../../utils/texts'
import { Contributions, EmployerContributions, RefType } from '../../types'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'

type Props = {
    monthlyNetIncome: number
    annualNetIncome: number
    monthlySuperGrossIncome: number
    annualSuperGrossIncome: number
    isSeverelyDisabled: boolean
    employeeContributions: Contributions
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
    ) => {
        const isLargerThanTablet = useMediaQuery(device.tablet)

        return (
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
                        content: isLargerThanTablet ? (
                            <ContributionsTable
                                contributions={employeeContributions}
                            />
                        ) : (
                            <ContributionsTableMobile
                                contributions={employeeContributions}
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
    }
)

EmploymentCard.displayName = 'EmploymentCard'
