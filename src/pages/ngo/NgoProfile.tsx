import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Building2, ShieldCheck, Mail, Phone, MapPin, CheckCircle, Users } from 'lucide-react';

export const NgoProfile: React.FC = () => {
  const { currentUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [orgName, setOrgName] = useState(currentUser?.organizationName || 'Care & Share Relief Foundation');
  const [regId, setRegId] = useState(currentUser?.registrationNumber || 'REG-NGO-2024-8841');
  const [repName, setRepName] = useState(currentUser?.name || 'Priya Sharma (Coordinator)');
  const [email] = useState(currentUser?.email || 'coordinator@carengo.org');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98220 12345');
  const [city, setCity] = useState(currentUser?.city || 'Mumbai & Navi Mumbai');
  const [beneficiaryType, setBeneficiaryType] = useState('Urban Shelters & Night Homes');
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
          <h1 className="text-xl font-bold text-slate-900">NGO Organization Profile</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Registered charitable trust verification and operational details.
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
          <span>Organization profile updated.</span>
        </div>
      )}

      <Card>
        {isEditing ? (
          <form onSubmit={handleSave} className="space-y-4">
            <Input
              label="Official Organization Name"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
            />
            <Input
              label="Trust / Registration ID"
              value={regId}
              onChange={(e) => setRegId(e.target.value)}
              required
            />
            <Input
              label="Coordinator / Representative Name"
              value={repName}
              onChange={(e) => setRepName(e.target.value)}
              required
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Contact Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Input
                label="Operating City / Region"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <Input
              label="Primary Beneficiaries Served"
              value={beneficiaryType}
              onChange={(e) => setBeneficiaryType(e.target.value)}
              placeholder="e.g. Children's home, elder care, community kitchen"
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
              <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-lg">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{orgName}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-sky-700 font-medium bg-sky-50 px-2 py-0.5 rounded border border-sky-200 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-sky-600" />
                    <span>Verified NGO Partner</span>
                  </span>
                  <span className="text-xs font-mono text-slate-500">ID: {regId}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-start gap-2.5">
                <Users className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Representative</span>
                  <span className="font-semibold text-slate-800">{repName}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Official Email</span>
                  <span className="font-semibold text-slate-800">{email}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Helpline / Phone</span>
                  <span className="font-semibold text-slate-800">{phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 block">Operational Region</span>
                  <span className="font-semibold text-slate-800">{city}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-xs">
              <span className="text-slate-400 block mb-1">Beneficiary Demographic Focus:</span>
              <p className="text-slate-700 font-medium">{beneficiaryType}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
