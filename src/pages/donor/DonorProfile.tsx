import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { UserCheck, Building, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export const DonorProfile: React.FC = () => {
  const { currentUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || 'College Food Donor');
  const [email] = useState(currentUser?.email || 'donor@collegeproject.edu');
  const [organization, setOrganization] = useState(currentUser?.organizationName || 'Campus Cafeteria Services');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [city, setCity] = useState(currentUser?.city || 'Mumbai, Maharashtra');
  const [address, setAddress] = useState(currentUser?.address || '12 Community Hub, Sector 4');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Donor Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your donor account information and default pickup location.
          </p>
        </div>
        {!isEditing && (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      {saveSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved locally.</span>
        </div>
      )}

      <Card>
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Full Name / Representative"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Organization / Business Name"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
              placeholder="e.g. Hotel Grand / Individual"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Contact Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Input
                label="City / Region"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <Input
              label="Default Street Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm">
                Save Changes
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-5 text-sm">
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
                {name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{name}</h3>
                <span className="text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Food Donor
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <Building className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Organization</span>
                  <span className="font-semibold text-slate-800">{organization || 'Individual Donor'}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Email Address</span>
                  <span className="font-semibold text-slate-800">{email}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Phone Number</span>
                  <span className="font-semibold text-slate-800">{phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">City & Region</span>
                  <span className="font-semibold text-slate-800">{city}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400 block mb-1">Registered Default Address:</span>
              <p className="text-slate-700">{address}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
