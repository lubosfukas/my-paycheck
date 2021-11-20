import { forwardRef, useState } from 'react'
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
import { RefType } from '../../../types'

type Props = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

export const OtherCriteriaModal = forwardRef<RefType, Props>(
    ({ isOpen, onClose, onConfirm }, ref) => {
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
            <Modal
                closeOnOverlayClick={false}
                finalFocusRef={ref}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Rozšírené zadanie</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{renderSwitch(step)}</ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="green"
                            disabled={step === 1}
                            mr={3}
                            onClick={() => setStep(step - 1)}
                            variant="ghost"
                            _active={{ borderColor: 'green.200' }}
                        >
                            Predchádzajúci
                        </Button>
                        {lastStep ? (
                            <Button
                                colorScheme="green"
                                onClick={() => {
                                    onClose()
                                    onConfirm()
                                }}
                                _active={{ borderColor: 'green.200' }}
                            >
                                Vypočítať
                            </Button>
                        ) : (
                            <Button
                                colorScheme="green"
                                onClick={() => setStep(step + 1)}
                                _active={{ borderColor: 'green.200' }}
                            >
                                Ďalej
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }
)

OtherCriteriaModal.displayName = 'income-input-modal'
