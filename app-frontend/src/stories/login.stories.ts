import { Meta, StoryObj } from '@storybook/react';
import LoginForm from '@/components/landing/LoginForm';

const meta: Meta<typeof LoginForm> = {
    title: 'Login Form',
    component: LoginForm,
};

export default meta;

// Simple default export without args
export const Default: StoryObj<typeof LoginForm> = {};