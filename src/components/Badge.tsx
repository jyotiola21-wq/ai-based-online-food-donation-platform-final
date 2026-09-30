import React from 'react';
import { DonationStatus } from '../types';

interface BadgeProps {
  status?: DonationStatus;
  variant?: 'success' | 'warning' | 'info' | 'neutral' | 'danger';
  children?: React.ReactNode;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  status,
  variant,
  children,
  size = 'md',
}) => {
  let resolvedVariant = variant || 'neutral';
  let label = children;

  if (status) {
    switch (status) {
      case 'available':
        resolvedVariant = 'success';
        label = label || 'Available';
        break;
      case 'requested':
        resolvedVariant = 'warning';
        label = label || 'Requested';
        break;
      case 'accepted':
        resolvedVariant = 'info';
        label = label || 'Accepted';
        break;
      case 'completed':
        resolvedVariant = 'neutral';
        label = label || 'Completed';
        break;
      case 'cancelled':
        resolvedVariant = 'danger';
        label = label || 'Cancelled';
        break;
    }
  }

  const variantStyles = {
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${variantStyles[resolvedVariant]} ${sizeStyles[size]}`}
    >
      {label}
    </span>
  );
};
