import { Meta, StoryObj } from '@storybook/react';
import SignupForm from '@/components/landing/SignupForm';

const meta: Meta<typeof SignupForm> = {
    title: 'Signup Form',
    component: SignupForm,
};

export default meta;

// Simple default export without args
export const Default: StoryObj<typeof SignupForm> = {};