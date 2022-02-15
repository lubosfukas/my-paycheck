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

import { ChildrenBelowSixInput } from './ChildrenBelowSixInput'
import { ChildrenAboveSixInput } from './ChildrenAboveSixInput'
import { SeverelyDisabledSwitch } from './SeverelyDisabledSwitch'
import { CompanionIncomeInput } from './CompanionIncomeInput'
import { useStepper } from '../../hooks'
import { RefType } from '../../types'

const renderBody = (param: number) => {
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
        } = useStepper({ max: 4 })

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
                            _active={{ borderColor: 'green.200' }}
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
                                _active={{ borderColor: 'green.200' }}
                            >
                                Vypočítať
                            </Button>
                        ) : (
                            <Button
                                onClick={increment}
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

OtherCriteriaModal.displayName = 'OtherCriteriaModal'
