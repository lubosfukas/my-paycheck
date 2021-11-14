import { useContext, useState } from 'react'
import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react'

import { IncomeContext } from './IncomeContext'
import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'

type Props = {
    onConfirm: () => void
}

export const IncomeInput = ({ onConfirm }: Props) => {
    const [income, setIncome] = useState('')
    const { setMonthlyGrossIncome } = useContext(IncomeContext)
    const isLargerThanTablet = useMediaQuery(device.tablet)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setIncome(newValue)

        if (newValue) setMonthlyGrossIncome(parseInt(newValue))
        else setMonthlyGrossIncome(0)
    }

    const numValue = parseFloat(income)
    const isInvalid = numValue < 700
    const isDisabled = !income || isInvalid

    return (
        <Flex flexDirection={isLargerThanTablet ? 'row' : 'column'}>
            <InputGroup maxW="md">
                <InputLeftElement
                    fontSize={isLargerThanTablet ? 'md' : 'sm'}
                    color="gray.400"
                    pointerEvents="none"
                >
                    €
                </InputLeftElement>
                <Input
                    focusBorderColor="green.200"
                    fontSize={isLargerThanTablet ? 'md' : 'sm'}
                    isInvalid={isInvalid}
                    onChange={onChange}
                    onKeyDown={(
                        event: React.KeyboardEvent<HTMLInputElement>
                    ) => {
                        if (event.key === 'Enter' && !isDisabled) onConfirm()
                    }}
                    placeholder="Zadajte svoj hrubý mesačný príjem (min. 700€)"
                    type="number"
                    value={income}
                />
            </InputGroup>
            <Button
                colorScheme="green"
                disabled={isDisabled}
                ml={isLargerThanTablet ? 4 : 0}
                mt={isLargerThanTablet ? 0 : 4}
                onClick={onConfirm}
                _active={{ borderColor: 'green.200' }}
            >
                Vypočítať
            </Button>
        </Flex>
    )
}
