import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react'

import { device } from '../../utils/device'
import { useMediaQuery } from '../../hooks'

type Props = {
    value: string
    onChange: (newValue: string) => void
    invalid?: boolean
    placeholder?: string
}

export const IncomeInput = ({
    onChange,
    placeholder,
    value,
    invalid = false,
}: Props) => {
    const isLargerThanTablet = useMediaQuery(device.tablet)

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
                isInvalid={invalid}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    onChange(event.target.value)
                }
                placeholder={placeholder}
                type="number"
                value={value ? value.toString() : ''}
            />
        </InputGroup>
    )
}
