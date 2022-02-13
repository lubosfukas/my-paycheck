import { act, renderHook } from '@testing-library/react-hooks'

import { useStepper } from '../../hooks'

describe('useStepper', () => {
    test('increments step', () => {
        const { result } = renderHook(() => useStepper({ max: 5 }))

        expect(result.current.value).toStrictEqual(1)
        act(() => result.current.increment())
        expect(result.current.value).toStrictEqual(2)
    })

    test('decrements step', () => {
        const { result } = renderHook(() => useStepper({ max: 5, init: 2 }))

        expect(result.current.value).toStrictEqual(2)
        act(() => result.current.decrement())
        expect(result.current.value).toStrictEqual(1)
    })

    test('isFirst returns true', () => {
        const { result } = renderHook(() => useStepper({ max: 5 }))

        expect(result.current.value).toStrictEqual(1)
        expect(result.current.isFirst()).toStrictEqual(true)
    })

    test('isFirst returns false', () => {
        const { result } = renderHook(() => useStepper({ max: 5 }))

        act(() => result.current.increment())
        expect(result.current.value).toStrictEqual(2)
        expect(result.current.isFirst()).toStrictEqual(false)
    })

    test('isLast returns true', () => {
        const { result } = renderHook(() => useStepper({ max: 5, init: 5 }))

        expect(result.current.value).toStrictEqual(5)
        expect(result.current.isLast()).toStrictEqual(true)
    })

    test('isLast returns false', () => {
        const { result } = renderHook(() => useStepper({ max: 5, init: 5 }))

        act(() => result.current.decrement())
        expect(result.current.value).toStrictEqual(4)
        expect(result.current.isLast()).toStrictEqual(false)
    })

    test('resets stepper', () => {
        const { result } = renderHook(() => useStepper({ max: 5 }))

        expect(result.current.value).toStrictEqual(1)
        act(() => result.current.increment())
        expect(result.current.value).toStrictEqual(2)
        act(() => result.current.reset())
        expect(result.current.value).toStrictEqual(1)
    })
})
