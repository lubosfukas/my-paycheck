import { forwardRef } from 'react'
import {
    ContributionsTable,
    ContributionsTableMobile,
} from '../ContributionsTable'
import { IncomeCard } from '../IncomeCard'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'
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
                        content: isLargerThanTablet ? (
                            <ContributionsTable
                                id="employee-contributions"
                                contributions={employeeContributions}
                            />
                        ) : (
                            <ContributionsTableMobile
                                id="employee-contributions-mobile"
                                contributions={employeeContributions}
                            />
                        ),
                    },
                    {
                        id: 'employer-contributions',
                        label: 'Odvody zamestnávateľa',
                        content: isLargerThanTablet ? (
                            <ContributionsTable
                                id="employer-contributions"
                                contributions={employerContributions}
                            />
                        ) : (
                            <ContributionsTableMobile
                                id="employer-contributions-mobile"
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
