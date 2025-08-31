import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'error'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'This is an informational alert with important details.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Your RSVP has been successfully submitted!',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'There was an error processing your request. Please try again.',
  },
};

export const WithCustomIcon: Story = {
  args: {
    variant: 'info',
    icon: '🎉',
    children: 'Congratulations! You\'ve been invited to our wedding celebration.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Alert variant="info">
        This is an informational alert with important details about the event.
      </Alert>
      <Alert variant="success">
        Your RSVP has been successfully submitted! We look forward to seeing you.
      </Alert>
      <Alert variant="error">
        There was an error processing your request. Please try again or contact support.
      </Alert>
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    variant: 'info',
    children: (
      <div>
        <p className="font-semibold mb-2">Important Information</p>
        <p className="text-sm">
          This is a longer alert message that contains multiple paragraphs and detailed information 
          about the upcoming wedding celebration. Please read carefully and take note of all the details.
        </p>
      </div>
    ),
  },
};
