import { useContext } from 'react'
import { Stack, Switch, Text } from '@chakra-ui/react'

import { IncomeContext } from './IncomeContext'

export const SeverelyDisabledSwitch = () => {
    const { isSeverelyDisabled, setIsSeverelyDisabled } =
        useContext(IncomeContext)

    const handleCheckboxOnChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => setIsSeverelyDisabled(event.currentTarget.checked)

    return (
        <Stack alignItems="center" direction="row" spacing="4">
            <Text>ZŤP</Text>
            <Switch
                colorScheme="green"
                defaultChecked={isSeverelyDisabled}
                onChange={handleCheckboxOnChange}
            />
        </Stack>
    )
}
