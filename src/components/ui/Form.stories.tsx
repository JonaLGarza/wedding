import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Textarea } from './Textarea';
import { Select } from './Select';

const meta: Meta<typeof Input> = {
  title: 'UI/Form',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

// Input Stories
export const InputDefault: StoryObj<typeof Input> = {
  render: (args) => <Input placeholder="Enter your name..." {...args} />,
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    error: {
      control: { type: 'boolean' },
    },
  },
};

export const InputSizes: StoryObj<typeof Input> = {
  render: () => (
    <div className="space-y-4">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

export const InputStates: StoryObj<typeof Input> = {
  render: () => (
    <div className="space-y-4">
      <Input placeholder="Normal input" />
      <Input placeholder="Error input" error />
      <Input placeholder="Disabled input" disabled />
    </div>
  ),
};

// Textarea Stories
export const TextareaDefault: StoryObj<typeof Textarea> = {
  render: (args) => <Textarea placeholder="Enter your message..." {...args} />,
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    error: {
      control: { type: 'boolean' },
    },
  },
};

export const TextareaSizes: StoryObj<typeof Textarea> = {
  render: () => (
    <div className="space-y-4">
      <Textarea size="sm" placeholder="Small textarea" />
      <Textarea size="md" placeholder="Medium textarea" />
      <Textarea size="lg" placeholder="Large textarea" />
    </div>
  ),
};

export const TextareaStates: StoryObj<typeof Textarea> = {
  render: () => (
    <div className="space-y-4">
      <Textarea placeholder="Normal textarea" />
      <Textarea placeholder="Error textarea" error />
      <Textarea placeholder="Disabled textarea" disabled />
    </div>
  ),
};

// Select Stories
export const SelectDefault: StoryObj<typeof Select> = {
  render: (args) => (
    <Select {...args}>
      <option value="">Select an option</option>
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </Select>
  ),
  args: {
    size: 'md',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    error: {
      control: { type: 'boolean' },
    },
  },
};

export const SelectSizes: StoryObj<typeof Select> = {
  render: () => (
    <div className="space-y-4">
      <Select size="sm">
        <option value="">Small select</option>
        <option value="1">Option 1</option>
      </Select>
      <Select size="md">
        <option value="">Medium select</option>
        <option value="1">Option 1</option>
      </Select>
      <Select size="lg">
        <option value="">Large select</option>
        <option value="1">Option 1</option>
      </Select>
    </div>
  ),
};

export const SelectStates: StoryObj<typeof Select> = {
  render: () => (
    <div className="space-y-4">
      <Select>
        <option value="">Normal select</option>
        <option value="1">Option 1</option>
      </Select>
      <Select error>
        <option value="">Error select</option>
        <option value="1">Option 1</option>
      </Select>
      <Select disabled>
        <option value="">Disabled select</option>
        <option value="1">Option 1</option>
      </Select>
    </div>
  ),
};

// Form Layout Example
export const FormLayout: StoryObj = {
  render: () => (
    <div className="w-96 space-y-4 p-6 bg-[var(--brand-ivory)] rounded-2xl">
      <h3 className="text-lg font-semibold text-[var(--brand-olive)]">Contact Form</h3>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--brand-olive)]">Name</label>
        <Input placeholder="Enter your full name" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--brand-olive)]">Email</label>
        <Input type="email" placeholder="Enter your email" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--brand-olive)]">Message</label>
        <Textarea placeholder="Enter your message" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-[var(--brand-olive)]">Category</label>
        <Select>
          <option value="">Select a category</option>
          <option value="general">General</option>
          <option value="support">Support</option>
          <option value="feedback">Feedback</option>
        </Select>
      </div>
    </div>
  ),
};
