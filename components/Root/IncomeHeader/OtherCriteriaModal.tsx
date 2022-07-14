import { forwardRef, RefObject } from 'react'
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

import { ChildrenAboveSixInput } from './ChildrenAboveSixInput'
import { ChildrenBelowSixInput } from './ChildrenBelowSixInput'
import { ChildrenAboveFifteen } from './ChildrenAboveFifteen'
import { SeverelyDisabledSwitch } from './SeverelyDisabledSwitch'
import { CompanionIncomeInput } from './CompanionIncomeInput'
import { useStepper } from '../../../hooks'
import { RefType } from '../../../types'

const renderBody = (param: number) => {
    switch (param) {
        case 1:
            return <CompanionIncomeInput />
        case 2:
            return <ChildrenBelowSixInput />
        case 3:
            return <ChildrenAboveSixInput />
        case 4:
            return <ChildrenAboveFifteen />
        case 5:
            return <SeverelyDisabledSwitch />
        default:
            return <div />
    }
}

type Props = {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
}

export const OtherCriteriaModal = forwardRef<RefType, Props>(
    ({ isOpen, onClose, onConfirm }, ref) => {
        const {
            value: step,
            increment,
            decrement,
            reset,
            isFirst,
            isLast,
        } = useStepper({ max: 5 })

        const handleModalClosed = () => {
            reset()
            onClose()
        }

        return (
            <Modal
                closeOnOverlayClick={false}
                finalFocusRef={ref as RefObject<HTMLDivElement>}
                isCentered={true}
                isOpen={isOpen}
                onClose={handleModalClosed}
            >
                <ModalOverlay />
                <ModalContent height="2xs">
                    <ModalHeader>Rozšírené zadanie</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{renderBody(step)}</ModalBody>

                    <ModalFooter>
                        <Button
                            disabled={isFirst()}
                            mr={3}
                            onClick={decrement}
                            variant="ghost"
                        >
                            Predchádzajúci
                        </Button>
                        {isLast() ? (
                            <Button
                                onClick={() => {
                                    onClose()
                                    onConfirm()
                                    reset()
                                }}
                            >
                                Vypočítať
                            </Button>
                        ) : (
                            <Button onClick={increment}>Ďalej</Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        )
    }
)

OtherCriteriaModal.displayName = 'OtherCriteriaModal'
