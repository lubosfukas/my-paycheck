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

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setIncome(event.target.value)

    const numValue = parseFloat(income)
    const isInvalid = numValue < 700

    return (
        <Flex flexDirection={isLargerThanTablet ? 'row' : 'column'}>
            <InputGroup maxW="md">
                <InputLeftElement color="gray.400" pointerEvents="none">
                    €
                </InputLeftElement>
                <Input
                    focusBorderColor="green.200"
                    isInvalid={isInvalid}
                    onChange={onChange}
                    onBlur={() => setMonthlyGrossIncome(numValue)}
                    placeholder="Zadajte svoj hrubý mesačný príjem (min. 700€)"
                    type="number"
                    value={income}
                />
            </InputGroup>
            <Button
                colorScheme="green"
                disabled={!income || isInvalid}
                ml={isLargerThanTablet ? 4 : 0}
                mt={isLargerThanTablet ? 0 : 4}
                onClick={() => onConfirm()}
                _active={{ borderColor: 'green.200' }}
            >
                Vypočítať
            </Button>
        </Flex>
    )
}
