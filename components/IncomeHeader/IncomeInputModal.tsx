import { useState } from 'react'
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react'

import { ChildrenBelowSixInput } from './ChildrenBelowSixInput'
import { ChildrenAboveSixInput } from './ChildrenAboveSixInput'
import { SeverelyDisabledSwitch } from './SeverelyDisabledSwitch'
import { CompanionIncomeInput } from './CompanionIncomeInput'

type Props = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

export const IncomeInputModal = ({ isOpen, onClose, onConfirm }: Props) => {
    const [step, setStep] = useState(1)

    const lastStep = step === 4

    const renderSwitch = (param: number) => {
        switch (param) {
            case 1:
                return <CompanionIncomeInput />
            case 2:
                return <ChildrenBelowSixInput />
            case 3:
                return <ChildrenAboveSixInput />
            case 4:
                return <SeverelyDisabledSwitch />
            default:
                return <div />
        }
    }

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Rozšírené zadanie</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{renderSwitch(step)}</ModalBody>

                <ModalFooter>
                    <Button
                        disabled={step === 1}
                        mr={3}
                        onClick={() => setStep(step - 1)}
                        variant="ghost"
                    >
                        Predchádzajúci
                    </Button>
                    {lastStep ? (
                        <Button
                            onClick={() => {
                                onClose()
                                onConfirm()
                            }}
                        >
                            Vypočítať
                        </Button>
                    ) : (
                        <Button onClick={() => setStep(step + 1)}>Ďalej</Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
