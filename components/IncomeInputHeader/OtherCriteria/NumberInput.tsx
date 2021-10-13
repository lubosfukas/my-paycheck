import { useState } from 'react'
import { HStack, Input, Text } from '@chakra-ui/react'

type Props = {
    defaultValue: number
    label: string
    onChange: (newValue: number) => void
}

const NumberInput = ({ defaultValue, label, onChange }: Props) => {
    const [value, setValue] = useState(defaultValue.toString())

    const isInvalid = parseInt(value) < 0

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value)

    const handleOnBlur = () => {
        if (!value) {
            setValue('0')
            onChange(0)
        } else onChange(parseInt(value))
    }

    return (
        <HStack>
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
            <Text>{label}</Text>
        </HStack>
    )
}

export default NumberInput
