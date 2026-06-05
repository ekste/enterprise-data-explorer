import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomerDetail } from './CustomerDetail';

describe('CustomerDetail', () => {
    it('shows placeholder text when no customer is selected', () => {
        render(
            <CustomerDetail
                customer={undefined}
                onClose={vi.fn()}
            />,
        );

        expect(
            screen.getByText('Select a customer to view details.'),
        ).toBeInTheDocument();
    });
});