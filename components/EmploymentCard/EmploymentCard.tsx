import { forwardRef } from 'react'
import { ContributionsTable, ContributionsTableMobile } from '../common'
import { IncomeCard } from '../common'
import { Contributions, RefType } from '../../types'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'

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
    ) => {
        const isLargerThanTablet = useMediaQuery(device.tablet)

        return (
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
                        label: 'Čistý ročný príjem',
                        value: monthlySuperGrossIncome,
                        cash: true,
                        colored: false,
                    },
                ]}
                additional={[
                    {
                        id: 'employee-contributions',
                        label: 'Odvody zamestnanca',
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
                        label: 'Odvody zamestnávateľa',
                        content: isLargerThanTablet ? (
                            <ContributionsTable
                                contributions={employerContributions}
                            />
                        ) : (
                            <ContributionsTableMobile
                                contributions={employerContributions}
                            />
                        ),
                    },
                ]}
            />
        )
    }
)

EmploymentCard.displayName = 'EmploymentCard'
