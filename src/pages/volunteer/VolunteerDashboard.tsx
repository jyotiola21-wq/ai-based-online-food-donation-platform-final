import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDonations } from '../../context/DonationContext';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { Truck, CheckCircle2, MapPin, Clock, UserCheck } from 'lucide-react';

export const VolunteerDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { donations } = useDonations();

  const acceptedPickups = donations.filter((d) => d.status === 'accepted');
  const completedPickups = donations.filter((d) => d.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
            Volunteer Logistics Portal
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Welcome, {currentUser?.name || 'Community Volunteer'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pick up verified donations from donors and transport them to designated NGO distribution points.
          </p>
        </div>
        <Link to="/volunteer/deliveries">
          <Button size="md" className="bg-purple-600 hover:bg-purple-700 flex items-center gap-1.5">
            <Truck className="w-4 h-4" />
            <span>Available Deliveries</span>
          </Button>
        </Link>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4" headerBorder={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Pickups Ready</span>
            <div className="p-1.5 bg-purple-100 text-purple-700 rounded">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{acceptedPickups.length}</div>
          <span className="text-[11px] text-slate-500">Accepted & ready for transit</span>
        </Card>

        <Card className="p-4" headerBorder={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Completed Runs</span>
            <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900">{completedPickups.length}</div>
          <span className="text-[11px] text-slate-500">Successfully delivered</span>
        </Card>

        <Card className="p-4" headerBorder={false}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Vehicle Mode</span>
            <div className="p-1.5 bg-slate-100 text-slate-700 rounded">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-base font-semibold text-slate-900">
            {currentUser?.vehicleType || 'Motorcycle'}
          </div>
          <span className="text-[11px] text-slate-500">Registered transport</span>
        </Card>
      </div>

      {/* Available Deliveries Queue */}
      <Card
        title="Immediate Collection Tasks"
        subtitle="Donation parcels approved by donors and pending delivery"
        action={
          <Link to="/volunteer/deliveries">
            <Button variant="ghost" size="sm">
              View All Runs
            </Button>
          </Link>
        }
      >
        {acceptedPickups.length === 0 ? (
          <EmptyState
            title="No deliveries available."
            description="There are currently no accepted food parcels scheduled for pickup. When an NGO's request is accepted by a donor, pickup routes will appear here."
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {acceptedPickups.map((item) => (
              <div
                key={item.id}
                className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 px-2 rounded-md"
              >
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{item.foodName}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>Qty: {item.quantity}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {item.pickupAddress}, {item.pickupCity}
                    </span>
                    <span>•</span>
                    <span className="text-purple-700 font-medium">
                      Destination NGO: {item.requestedByNgoName || 'Registered Shelter'}
                    </span>
                  </div>
                </div>
                <Link to="/volunteer/deliveries">
                  <Button size="sm" variant="outline">
                    View Route
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
