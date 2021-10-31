import { useState } from 'react'
import { HStack, Input, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

const StyledText = styled(Text)`
    ::after {
        content: ':';
    }
`

type Props = {
    defaultValue: number
    label: string
    onChange: (newValue: number) => void
    max?: number
    min?: number
}

export const NumberInput = ({
    defaultValue,
    label,
    onChange,
    max,
    min,
}: Props) => {
    const [value, setValue] = useState(
        defaultValue !== undefined ? defaultValue.toString() : ''
    )

    const numValue = parseFloat(value)
    const isInvalid =
        (min !== undefined ? numValue < min : false) ||
        (max !== undefined ? numValue > max : false)

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value)

    const handleOnBlur = () => {
        if (defaultValue === undefined) return

        if (!value || isInvalid) {
            setValue(defaultValue.toString())
            onChange(defaultValue)
        } else onChange(numValue)
    }

    return (
        <HStack>
            <StyledText>{label}</StyledText>
            <Input
                focusBorderColor="green.200"
                isInvalid={isInvalid}
                maxW="16"
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                size="sm"
                type="number"
                value={value}
            />
        </HStack>
    )
}
