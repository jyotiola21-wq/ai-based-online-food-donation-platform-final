import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Card } from '../components/Card';
import { HeartHandshake, LogIn, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('donor');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate login without real backend authentication
    login(email, role);
    navigate(`/${role}`);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="text-center mb-6">
        <div className="inline-flex p-2.5 bg-emerald-100 text-emerald-700 rounded-full mb-3">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Sign in to your account</h1>
        <p className="text-sm text-slate-600 mt-1">
          Select your platform role to access your dashboard
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select
            label="Select Role"
            value={role}
            onChange={(e) => setRole(e.target.value as UserRole)}
            options={[
              { value: 'donor', label: 'Food Donor' },
              { value: 'ngo', label: 'NGO / Charitable Organization' },
              { value: 'volunteer', label: 'Volunteer Courier' },
            ]}
            helperText="Choose the persona you are testing or logging in as"
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. donor@collegeproject.org"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            error={errors.email}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: undefined });
            }}
            error={errors.password}
            helperText="Minimum 6 characters for demo validation"
            required
          />

          <div className="pt-2">
            <Button type="submit" fullWidth>
              <LogIn className="w-4 h-4 mr-2" />
              <span>Log In</span>
            </Button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            <strong>Sign-in Tip:</strong> Select your role above and enter any valid email/password to explore your dedicated dashboard.
          </span>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
          Don't have an account yet?{' '}
          <Link to="/register" className="font-semibold text-emerald-600 hover:text-emerald-700 underline">
            Register here
          </Link>
        </div>
      </Card>
    </div>
  );
};
