import { useState } from 'react'

type Props = {
    max: number
    init?: number
    min?: number
    step?: number
}

export const useStepper = ({ max, init = 1, step = 1 }: Props) => {
    const [value, setValue] = useState<number>(init)

    const increment = () => setValue(value + step)
    const decrement = () => setValue(value - step)
    const reset = () => setValue(init)
    const isFirst = () => value === init
    const isLast = () => value === max

    return { value, increment, decrement, reset, isFirst, isLast }
}
