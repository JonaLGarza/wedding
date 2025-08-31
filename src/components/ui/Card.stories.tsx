import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { Button } from './Button';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <CardContent>
        <p>This is a basic card with content.</p>
      </CardContent>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <h3 className="text-xl font-semibold text-[var(--brand-olive)]">Card Title</h3>
        </CardHeader>
        <CardContent>
          <p>This card has a header with a title.</p>
        </CardContent>
      </>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    children: (
      <>
        <CardContent>
          <p>This card has content and a footer with actions.</p>
        </CardContent>
        <CardFooter>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">Cancel</Button>
            <Button variant="primary" size="sm">Save</Button>
          </div>
        </CardFooter>
      </>
    ),
  },
};

export const Complete: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <h3 className="text-xl font-semibold text-[var(--brand-olive)]">Event Details</h3>
          <p className="text-[var(--muted-fg)]">Wedding Ceremony</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-medium text-[var(--brand-olive)]">Date:</span>
              <span>December 15, 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-[var(--brand-olive)]">Location:</span>
              <span>St. Mary's Church</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-[var(--brand-olive)]">Time:</span>
              <span>2:00 PM</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="primary" className="w-full">Confirm Attendance</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Interactive: Story = {
  args: {
    className: 'cursor-pointer',
    children: (
      <CardContent>
        <p>Hover over this card to see the subtle animation effect.</p>
        <p className="text-sm text-[var(--muted-fg)] mt-2">The card will scale slightly and show a shadow.</p>
      </CardContent>
    ),
  },
};
