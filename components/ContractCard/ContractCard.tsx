import { IncomeCard } from '../common'
import { ContributionsTable, ContributionsTableMobile } from '../common'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'
import { Contributions } from '../../types'

type Props = {
    averageNetIncome: number
    contributions: Contributions
    netIncome: number
    monthsWorked?: number
}

export const ContractCard = ({
    averageNetIncome,
    contributions,
    netIncome,
    monthsWorked = 10.5,
}: Props) => {
    const isLargerThanTablet = useMediaQuery(device.tablet)

    const additional = [
        {
            id: 'contract-contributions',
            label: 'Odvody a daň',
            content: isLargerThanTablet ? (
                <ContributionsTable contributions={contributions} />
            ) : (
                <ContributionsTableMobile contributions={contributions} />
            ),
        },
    ]
    const content = [
        {
            label: 'Čistý mesačný príjem',
            value: netIncome,
            colored: true,
        },
        {
            label: 'Odpracované mesiace',
            value: monthsWorked,
            cash: false,
        },
        {
            label: 'Priemerný čistý mesačný príjem',
            value: averageNetIncome,
        },
    ]

    return (
        <IncomeCard
            additional={additional}
            content={content}
            title="Živnosť po prvom roku"
        />
    )
}
