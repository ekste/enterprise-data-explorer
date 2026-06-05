import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CustomerDetail } from './CustomerDetail';

describe('CustomerDetail', () => {
    it('shows placeholder text when no customer is selected', () => {
        render(<CustomerDetail customer={undefined} />);

        expect(
            screen.getByText('Select a customer to view details.'),
        ).toBeInTheDocument();
    });
});