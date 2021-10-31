import { EmployeeContributionsTable } from './EmployeeContributionsTable'
import { EmployerContributionsTable } from './EmployerContributionsTable'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'
import { texts } from '../../utils/texts'
import { IncomeCard } from '../common'

type EmployeeContributions = {
    healthInsurance: number
    socialInsurance: number
    medicareInsurance: number
    retirementInsurance: number
    disabilityInsurance: number
    unemploymentInsurance: number
    incomeTax: number
}

type EmployerContributions = {
    healthInsurance: number
    socialInsurance: number
    medicareInsurance: number
    retirementInsurance: number
    disabilityInsurance: number
    unemploymentInsurance: number
    guaranteeFund: number
    reserveFund: number
    injuryInsurance: number
}

type Props = {
    monthlyNetIncome: number
    annualNetIncome: number
    monthlySuperGrossIncome: number
    annualSuperGrossIncome: number
    monthsWorked: number
    isSeverelyDisabled: boolean
    employeeContributions: EmployeeContributions
    employerContributions: EmployerContributions
}

const EmploymentCard = ({
    monthlyNetIncome,
    annualNetIncome,
    monthlySuperGrossIncome,
    annualSuperGrossIncome,
    monthsWorked,
    isSeverelyDisabled,
    employeeContributions,
    employerContributions,
}: Props) => {
    const isLargerThanTablet = useMediaQuery(device.tablet)

    return (
        <IncomeCard
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
                    label: texts['employmentCard.annualNetIncome'],
                    value: annualNetIncome,
                    cash: true,
                    colored: false,
                },
                {
                    label: texts['employmentCard.monthlySuperGrossIncome'],
                    value: monthlySuperGrossIncome,
                    cash: true,
                    colored: false,
                },
                {
                    label: texts['employmentCard.annualSuperGrossIncome'],
                    value: annualSuperGrossIncome,
                    cash: true,
                    colored: false,
                },
            ]}
            additional={
                isLargerThanTablet
                    ? [
                          {
                              id: 'employee-contributions',
                              label: texts[
                                  'employmentCard.employeeContributions'
                              ],
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
                              label: texts[
                                  'employmentCard.employerContributions'
                              ],
                              content: (
                                  <EmployerContributionsTable
                                      monthsWorked={monthsWorked}
                                      isSeverelyDisabled={isSeverelyDisabled}
                                      {...employerContributions}
                                  />
                              ),
                          },
                      ]
                    : undefined
            }
        />
    )
}

export default EmploymentCard
