import { ContributionsTableDesktop } from './ContributionsTableDesktop'
import { ContributionsTableMobile } from './ContributionsTableMobile'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'
import { Props } from './types'

export const ContributionsTable = (props: Props) => {
    const isLargerThanTablet = useMediaQuery(device.tablet)

    if (isLargerThanTablet) return <ContributionsTableDesktop {...props} />
    return <ContributionsTableMobile {...props} />
}
