import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

import { useMediaQuery } from '../../hooks'
import { device } from '../../utils/device'

type Props = {
    value: number
    onChange: (newValue: number) => void
    placeholder?: string
}

export const IncomeInput = ({ onChange, placeholder, value }: Props) => {
    const isLargerThanTablet = useMediaQuery(device.tablet)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        onChange(newValue ? parseInt(newValue) : 0)
    }

    return (
        <InputGroup>
            <InputLeftElement
                fontSize={isLargerThanTablet ? 'md' : 'sm'}
                color="gray.400"
                pointerEvents="none"
            >
                €
            </InputLeftElement>
            <Input
                fontSize={isLargerThanTablet ? 'md' : 'sm'}
                isInvalid={value > 0 && value < 700}
                onChange={handleChange}
                placeholder={placeholder}
                type="number"
                value={value ? value.toString() : ''}
            />
        </InputGroup>
    )
}
