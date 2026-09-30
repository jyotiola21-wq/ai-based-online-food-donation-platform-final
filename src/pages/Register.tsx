import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Card } from '../components/Card';
import { HeartHandshake, UserPlus, Info } from 'lucide-react';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [role, setRole] = useState<UserRole>('donor');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Role-specific fields
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('Motorcycle / Scooter');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Contact phone number is required.';
    }

    if (!city.trim()) {
      newErrors.city = 'City or location is required.';
    }

    if (role === 'ngo') {
      if (!organizationName.trim()) {
        newErrors.organizationName = 'Official NGO name is required.';
      }
      if (!registrationNumber.trim()) {
        newErrors.registrationNumber = 'NGO registration or trust ID is required.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    register({
      name,
      email,
      role,
      phone,
      city,
      organizationName: role === 'ngo' ? organizationName : organizationName || undefined,
      registrationNumber: role === 'ngo' ? registrationNumber : undefined,
      vehicleType: role === 'volunteer' ? vehicleType : undefined,
    });

    navigate(`/${role}`);
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-12">
      <div className="text-center mb-6">
        <div className="inline-flex p-2.5 bg-emerald-100 text-emerald-700 rounded-full mb-3">
          <HeartHandshake className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Create an Account</h1>
        <p className="text-sm text-slate-600 mt-1">
          Join the platform as a Donor, NGO partner, or Volunteer
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role Selection */}
          <Select
            label="Register As (Role)"
            value={role}
            onChange={(e) => {
              setRole(e.target.value as UserRole);
              setErrors({});
            }}
            options={[
              { value: 'donor', label: 'Food Donor (Individual / Restaurant / Business)' },
              { value: 'ngo', label: 'NGO / Charitable Shelter / Community Kitchen' },
              { value: 'volunteer', label: 'Volunteer Logistics Courier' },
            ]}
            required
            helperText="Customizes profile requirements for your stakeholder category"
          />

          {/* Common Account Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              required
            />
            <Input
              label="Email Address"
              type="email"
              placeholder="e.g. user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Contact Phone"
              type="tel"
              placeholder="e.g. +91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={errors.phone}
              required
            />
            <Input
              label="City / Region"
              type="text"
              placeholder="e.g. Mumbai, Maharashtra"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              error={errors.city}
              required
            />
          </div>

          {/* Role-Specific Fields */}
          {role === 'donor' && (
            <div className="p-3 bg-emerald-50/60 rounded-md border border-emerald-200/80 space-y-3">
              <span className="text-xs font-semibold text-emerald-900 block">
                Donor Information
              </span>
              <Input
                label="Organization / Business Name (Optional)"
                type="text"
                placeholder="e.g. Green Valley Restaurant / Royal Banquet Hall"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                helperText="Leave blank if donating as an individual"
              />
            </div>
          )}

          {role === 'ngo' && (
            <div className="p-3 bg-sky-50/60 rounded-md border border-sky-200/80 space-y-3">
              <span className="text-xs font-semibold text-sky-900 block">
                NGO Verification Details
              </span>
              <Input
                label="Registered NGO Name"
                type="text"
                placeholder="e.g. Care & Share Relief Foundation"
                value={organizationName}
                onChange={(e) => setOrganizationName(e.target.value)}
                error={errors.organizationName}
                required
              />
              <Input
                label="NGO Registration / Trust ID"
                type="text"
                placeholder="e.g. REG-NGO-2024-8841"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                error={errors.registrationNumber}
                required
              />
            </div>
          )}

          {role === 'volunteer' && (
            <div className="p-3 bg-purple-50/60 rounded-md border border-purple-200/80 space-y-3">
              <span className="text-xs font-semibold text-purple-900 block">
                Volunteer Transportation
              </span>
              <Select
                label="Primary Mode of Transport"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                options={[
                  { value: 'Motorcycle / Scooter', label: 'Motorcycle / Scooter (Quick local pickup)' },
                  { value: 'Car', label: 'Car (Medium capacity)' },
                  { value: 'Van / Small Commercial Vehicle', label: 'Van / Commercial Vehicle (Bulk pickups)' },
                  { value: 'Bicycle', label: 'Bicycle (Short neighborhood delivery)' },
                  { value: 'On Foot', label: 'On Foot / Public Transit' },
                ]}
                required
              />
            </div>
          )}

          <div className="pt-2">
            <Button type="submit" fullWidth>
              <UserPlus className="w-4 h-4 mr-2" />
              <span>Complete Registration</span>
            </Button>
          </div>
        </form>

        <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-600 flex items-start gap-2">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>
            Enter your details according to your role to create your platform profile and access the dashboard.
          </span>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs text-slate-600">
          Already registered?{' '}
          <Link to="/login" className="font-semibold text-emerald-600 hover:text-emerald-700 underline">
            Log in to your account
          </Link>
        </div>
      </Card>
    </div>
  );
};
