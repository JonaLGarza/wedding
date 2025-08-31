import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['olive', 'terracotta', 'gold', 'subtle'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Olive: Story = {
  args: {
    variant: 'olive',
    children: 'Olive Badge',
  },
};

export const Terracotta: Story = {
  args: {
    variant: 'terracotta',
    children: 'Terracotta Badge',
  },
};

export const Gold: Story = {
  args: {
    variant: 'gold',
    children: 'Gold Badge',
  },
};

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    children: 'Subtle Badge',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Badge variant="olive">Olive</Badge>
      <Badge variant="terracotta">Terracotta</Badge>
      <Badge variant="gold">Gold</Badge>
      <Badge variant="subtle">Subtle</Badge>
    </div>
  ),
};
