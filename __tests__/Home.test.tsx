import React from 'react'
import { render } from '@testing-library/react'
import Home from '../pages/index'

describe('Home', () => {
    it('renders a header', () => {
        const { getByTestId } = render(<Home />)

        expect(getByTestId('header')).toBeInTheDocument()
    })
})
