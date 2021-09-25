import {
    Button,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react'
import styled from '@emotion/styled'

const StyledFlex = styled(Flex)`
    padding: 1rem;
`

const StyledButton = styled(Button)`
    margin-left: 1rem;
`

type Props = {
    value?: number
    onChange: (newValue: number) => void
}

const IncomeInput = ({ value, onChange }: Props) => {
    return (
        <StyledFlex>
            <InputGroup>
                <InputLeftElement color="gray.400" pointerEvents="none">
                    €
                </InputLeftElement>
                <Input
                    focusBorderColor="green.200"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        onChange(parseInt(event.target.value))
                    }
                    placeholder="Zadajte svoj hrubý mesačný príjem"
                    type="number"
                    value={value}
                />
            </InputGroup>
            <StyledButton colorScheme="green">Vypočítať</StyledButton>
        </StyledFlex>
    )
}

export default IncomeInput
