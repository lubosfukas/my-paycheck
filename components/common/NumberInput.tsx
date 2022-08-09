import {
    Button,
    HStack,
    Input,
    Text,
    VStack,
    useNumberInput,
} from '@chakra-ui/react'
import styled from '@emotion/styled'

type Props = {
    label: string
    value: number
    setValue: (newValue: number) => void
    max?: number
    min?: number
}

const StyledText = styled(Text)`
    &::after {
        content: ':';
    }
`

export const NumberInput = ({ label, max, min, value, setValue }: Props) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            max: max === undefined ? Infinity : max,
            min: min === undefined ? -Infinity : min,
            step: 1,
            defaultValue: 0,
            value,
            onChange: (_, newValue) => setValue(newValue),
        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps({ readOnly: true })

    return (
        <VStack alignItems="start">
            <StyledText>{label}</StyledText>
            <HStack maxW="200px">
                <Button colorScheme="gray" {...dec}>
                    -
                </Button>
                <Input {...input} />
                <Button colorScheme="gray" {...inc}>
                    +
                </Button>
            </HStack>
        </VStack>
    )
}
