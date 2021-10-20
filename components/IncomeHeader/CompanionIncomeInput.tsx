import { useContext, useState } from 'react'
import { Input, Stack, Switch, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

import { IncomeContext } from './IncomeContext'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'
import { texts } from '../../utils/texts'

const StyledText = styled(Text)`
    ::after {
        content: ':';
    }
`

export const CompanionIncomeInput = () => {
    const [isChecked, setIsChecked] = useState(false)
    const [income, setIncome] = useState('')

    const { setCompanionIncome } = useContext(IncomeContext)

    const isLargerThanTablet = useMediaQuery(device.tablet)

    const numIncome = income !== '' ? parseFloat(income) : undefined
    const isInvalid = numIncome === undefined || numIncome < 0
    const isDisabled = !isChecked

    const handleCheckboxOnBlur = () => {
        if (isChecked) setCompanionIncome(numIncome)
        else setCompanionIncome(undefined)
    }

    const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setIncome(event.target.value)

    const handleInputOnBlur = () => {
        if (isInvalid) {
            setIncome('')
            setCompanionIncome(undefined)
        } else setCompanionIncome(numIncome)
    }

    return (
        <Stack
            alignItems={isLargerThanTablet ? 'center' : 'start'}
            direction={isLargerThanTablet ? 'row' : 'column'}
            spacing="4"
        >
            <StyledText whiteSpace={isLargerThanTablet ? 'nowrap' : 'normal'}>
                {texts['companionIncomeInput.label']}
            </StyledText>
            <Switch
                checked={isChecked}
                colorScheme="green"
                onChange={() => setIsChecked(!isChecked)}
                onBlur={handleCheckboxOnBlur}
                whiteSpace={isLargerThanTablet ? 'nowrap' : 'normal'}
            >
                {isChecked
                    ? texts['companionIncomeInput.apply']
                    : texts['companionIncomeInput.dontApply']}
            </Switch>
            <Input
                focusBorderColor="green.200"
                isDisabled={isDisabled}
                isInvalid={!isDisabled && isInvalid}
                maxW="2xs"
                onChange={handleInputOnChange}
                onBlur={handleInputOnBlur}
                placeholder={texts['companionIncomeInput.placeholder']}
                type="number"
                value={income}
            />
        </Stack>
    )
}
