import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Users, Truck, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

export const VolunteerProfile: React.FC = () => {
  const { currentUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser?.name || 'Aarav Patel');
  const [email] = useState(currentUser?.email || 'volunteer@collegeproject.edu');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 97654 32100');
  const [city, setCity] = useState(currentUser?.city || 'Mumbai Suburban');
  const [vehicleType, setVehicleType] = useState(currentUser?.vehicleType || 'Motorcycle / Scooter');
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
          <h1 className="text-xl font-bold text-slate-900">Volunteer Courier Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Transportation capability and area preferences for food distribution.
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
          <span>Volunteer profile updated.</span>
        </div>
      )}

      <Card>
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Volunteer Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Input
                label="City / Neighborhood"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <Select
              label="Primary Mode of Transportation"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              options={[
                { value: 'Motorcycle / Scooter', label: 'Motorcycle / Scooter' },
                { value: 'Car', label: 'Car' },
                { value: 'Van / Small Commercial Vehicle', label: 'Van / Commercial Vehicle' },
                { value: 'Bicycle', label: 'Bicycle' },
                { value: 'On Foot', label: 'On Foot' },
              ]}
              required
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
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{name}</h3>
                <span className="text-xs text-purple-700 font-medium bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                  Registered Volunteer Courier
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Vehicle Transport</span>
                  <span className="font-semibold text-slate-800">{vehicleType}</span>
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
                  <span className="text-slate-400 block">Contact Phone</span>
                  <span className="font-semibold text-slate-800">{phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Active Territory</span>
                  <span className="font-semibold text-slate-800">{city}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
