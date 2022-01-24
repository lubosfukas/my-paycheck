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
}

const StyledText = styled(Text)`
    &::after {
        content: ':';
    }
`

export const NumberInput = ({ label, value, setValue }: Props) => {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 0,
            min: 0,
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
                <Button {...dec}>-</Button>
                <Input {...input} />
                <Button {...inc}>+</Button>
            </HStack>
        </VStack>
    )
}
