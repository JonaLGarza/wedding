import type { Meta, StoryObj } from '@storybook/react';
import WeatherWidget from './WeatherWidget';

const meta: Meta<typeof WeatherWidget> = {
  title: 'Atoms/WeatherWidget',
  component: WeatherWidget,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    city: {
      control: 'text',
      description: 'Nombre de la ciudad para mostrar el clima',
    },
    countryCode: {
      control: 'text',
      description: 'Código del país (ISO 3166-1 alpha-2)',
    },
    className: {
      control: 'text',
      description: 'Clases CSS adicionales',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    city: 'Saltillo',
    countryCode: 'MX',
  },
};

export const CustomCity: Story = {
  args: {
    city: 'Monterrey',
    countryCode: 'MX',
  },
};

export const WithCustomClass: Story = {
  args: {
    city: 'Saltillo',
    countryCode: 'MX',
    className: 'max-w-4xl mx-auto',
  },
};
