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

import { RefType } from '../../../types'
import { useStepper } from './useStepper'

type Props = {
    isOpen: boolean
    steps: number
    onClose: () => void
    onConfirm: () => void
    renderSteps: (step: number) => JSX.Element
}

export const OtherCriteriaModal = forwardRef<RefType, Props>(
    ({ isOpen, onClose, onConfirm, renderSteps, steps }, ref) => {
        const {
            value: step,
            increment,
            decrement,
            reset,
            isFirst,
            isLast,
        } = useStepper({ max: steps })

        return (
            <Modal
                isCentered={true}
                isOpen={isOpen}
                closeOnOverlayClick={false}
                finalFocusRef={ref as RefObject<HTMLDivElement>}
                onClose={() => {
                    reset()
                    onClose()
                }}
            >
                <ModalOverlay />
                <ModalContent height="2xs">
                    <ModalHeader>Rozšírené zadanie</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{renderSteps(step)}</ModalBody>

                    <ModalFooter>
                        <Button
                            disabled={isFirst()}
                            mr={3}
                            variant="ghost"
                            onClick={decrement}
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
