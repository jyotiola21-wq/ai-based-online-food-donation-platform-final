import React from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  className = '',
  headerBorder = true,
}) => {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden ${className}`}>
      {(title || subtitle || action) && (
        <div className={`px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${headerBorder ? 'border-b border-slate-200' : ''}`}>
          <div>
            {title && <h3 className="text-base font-semibold text-slate-900">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
};
