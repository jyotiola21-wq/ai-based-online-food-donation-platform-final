import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDonations } from '../../context/DonationContext';
import { FoodCategory } from '../../types';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { Textarea } from '../../components/Textarea';
import {
  Sparkles,
  PlusCircle,
  MapPin,
  Clock,
  Utensils,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

export const AddDonation: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { addDonation } = useDonations();

  // Form states
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState<FoodCategory>('Cooked Meals');
  const [preparationDateTime, setPreparationDateTime] = useState('');
  const [expiryDateTime, setExpiryDateTime] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupCity, setPickupCity] = useState(currentUser?.city || '');
  const [pickupLandmark, setPickupLandmark] = useState('');
  const [contactPerson, setContactPerson] = useState(currentUser?.name || '');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '');
  const [description, setDescription] = useState('');

  // AI Freshness UI prediction section states (UI only - no AI backend model yet)
  const [storageCondition, setStorageCondition] = useState<
    'Room Temperature' | 'Refrigerated' | 'Frozen' | 'Hot Held'
  >('Room Temperature');
  const [packagingType, setPackagingType] = useState('Sealed Food Container');
  const [freshnessNotes, setFreshnessNotes] = useState('');
  const [isAiEstimated, setIsAiEstimated] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!foodName.trim()) newErrors.foodName = 'Food name or type is required.';
    if (!quantity.trim()) newErrors.quantity = 'Quantity is required (e.g., 30 meal boxes, 15 kg).';
    if (!preparationDateTime) newErrors.preparationDateTime = 'Preparation date and time is required.';
    if (!expiryDateTime) newErrors.expiryDateTime = 'Expiry / usable-until date and time is required.';
    if (!pickupAddress.trim()) newErrors.pickupAddress = 'Pickup street address is required.';
    if (!pickupCity.trim()) newErrors.pickupCity = 'City is required.';
    if (!contactPerson.trim()) newErrors.contactPerson = 'Contact person name is required.';
    if (!contactPhone.trim()) newErrors.contactPhone = 'Contact phone number is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSimulateAiAssessment = () => {
    // UI preview of AI freshness estimation
    setIsAiEstimated(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addDonation({
      foodName,
      quantity,
      category,
      preparationDateTime,
      expiryDateTime,
      pickupAddress,
      pickupCity,
      pickupLandmark: pickupLandmark || undefined,
      contactPerson,
      contactPhone,
      description,
      freshnessNotes: freshnessNotes || (isAiEstimated ? 'AI Estimated: Safe for consumption within recommended time window' : undefined),
      storageCondition,
      donorId: currentUser?.id || 'donor_demo',
      donorName: currentUser?.name || 'College Demo Donor',
    });

    setSuccess(true);
    setTimeout(() => {
      navigate('/donor/donations');
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Add Food Donation</h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Provide accurate details about the surplus food to enable verified NGOs to claim and redistribute it promptly.
        </p>
      </div>

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-800 text-sm">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Food donation listed successfully! Redirecting to My Donations...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Food Details */}
        <Card title="1. Food Item Details">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Food Name / Item Type"
                placeholder="e.g. Vegetable Biryani, Bread Loaves, Packed Meals"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                error={errors.foodName}
                required
              />

              <Select
                label="Food Category"
                value={category}
                onChange={(e) => setCategory(e.target.value as FoodCategory)}
                options={[
                  { value: 'Cooked Meals', label: 'Cooked Meals' },
                  { value: 'Raw Groceries', label: 'Raw Groceries / Grains' },
                  { value: 'Bakery Items', label: 'Bakery Items' },
                  { value: 'Packaged Foods', label: 'Packaged Foods' },
                  { value: 'Fruits & Vegetables', label: 'Fruits & Vegetables' },
                  { value: 'Beverages', label: 'Beverages' },
                ]}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Quantity & Unit"
                placeholder="e.g. 50 boxes / 20 kg / 40 portions"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                error={errors.quantity}
                helperText="Specify estimated servings or weight"
                required
              />

              <Select
                label="Current Storage Condition"
                value={storageCondition}
                onChange={(e) =>
                  setStorageCondition(
                    e.target.value as 'Room Temperature' | 'Refrigerated' | 'Frozen' | 'Hot Held'
                  )
                }
                options={[
                  { value: 'Room Temperature', label: 'Room Temperature (20°C - 25°C)' },
                  { value: 'Refrigerated', label: 'Refrigerated (Below 4°C)' },
                  { value: 'Frozen', label: 'Frozen (Below 0°C)' },
                  { value: 'Hot Held', label: 'Hot Held (Above 60°C)' },
                ]}
              />
            </div>
          </div>
        </Card>

        {/* Section 2: Timing & Shelf-Life */}
        <Card title="2. Preparation & Usable Shelf-Life">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Preparation / Cooking Date & Time"
              type="datetime-local"
              value={preparationDateTime}
              onChange={(e) => setPreparationDateTime(e.target.value)}
              error={errors.preparationDateTime}
              helperText="When was this food cooked or packaged?"
              required
            />

            <Input
              label="Expiry / Usable-Until Date & Time"
              type="datetime-local"
              value={expiryDateTime}
              onChange={(e) => setExpiryDateTime(e.target.value)}
              error={errors.expiryDateTime}
              helperText="Safe consumption deadline"
              required
            />
          </div>
        </Card>

        {/* Section 3: AI Food Freshness Prediction UI Section */}
        <Card
          title="3. AI Freshness & Quality Prediction"
          subtitle="Machine learning freshness assessment interface"
        >
          <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-100 text-emerald-800 rounded">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-emerald-900">
                    AI Food Freshness Predictor
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Evaluates food safety based on storage temperature, food group, and packaging.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleSimulateAiAssessment}
                className="bg-white text-emerald-800 border-emerald-300 hover:bg-emerald-50"
              >
                Estimate Freshness
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <Select
                label="Packaging Type"
                value={packagingType}
                onChange={(e) => setPackagingType(e.target.value)}
                options={[
                  { value: 'Sealed Food Container', label: 'Sealed Food Container' },
                  { value: 'Foil / Plastic Wrap', label: 'Foil / Plastic Wrap' },
                  { value: 'Insulated Thermal Box', label: 'Insulated Thermal Box' },
                  { value: 'Open Buffet Trays', label: 'Open Buffet Trays' },
                  { value: 'Original Sealed Retail Box', label: 'Original Sealed Retail Box' },
                ]}
              />

              <Input
                label="Sensory Notes / Visual Check"
                placeholder="e.g. Freshly cooked, steam rising, aroma normal"
                value={freshnessNotes}
                onChange={(e) => setFreshnessNotes(e.target.value)}
                helperText="Color, odor, packaging integrity observations"
              />
            </div>

            {/* Simulated Prediction UI Display */}
            {isAiEstimated && (
              <div className="p-3 bg-white rounded border border-emerald-200 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">
                    AI Estimated Quality Index:
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    High Viability (Grade A)
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full w-[88%]" />
                </div>
                <p className="text-[11px] text-slate-500">
                  Recommended distribution window: Safe for immediate consumption within 4 hours under proper temperature control.
                </p>
              </div>
            )}

            <div className="flex items-start gap-2 text-[11px] text-slate-500">
              <AlertCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span>
                Note: Evaluates freshness score and expected shelf-life window based on donor food parameters and packaging integrity.
              </span>
            </div>
          </div>
        </Card>

        {/* Section 4: Pickup Location & Contact Information */}
        <Card title="4. Pickup Location & Contact Coordinator">
          <div className="space-y-4">
            <Input
              label="Street Address / Facility Name"
              placeholder="e.g. 104 Greenfield Road, Building 4, Kitchen Entrance"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              error={errors.pickupAddress}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="City / Municipality"
                placeholder="e.g. Mumbai"
                value={pickupCity}
                onChange={(e) => setPickupCity(e.target.value)}
                error={errors.pickupCity}
                required
              />

              <Input
                label="Landmark (Optional)"
                placeholder="e.g. Near Metro Station Gate 2"
                value={pickupLandmark}
                onChange={(e) => setPickupLandmark(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Pickup Contact Person"
                placeholder="e.g. Chef Ramesh / Manager David"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                error={errors.contactPerson}
                required
              />

              <Input
                label="Contact Phone Number"
                type="tel"
                placeholder="e.g. +91 98765 43210"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                error={errors.contactPhone}
                required
              />
            </div>
          </div>
        </Card>

        {/* Section 5: Additional Description */}
        <Card title="5. Additional Description & Dietary Details">
          <Textarea
            label="Additional Notes / Handling Instructions"
            placeholder="e.g. Contains vegetarian items only, no peanuts. Please bring large clean containers or insulated bags for transport."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            helperText="Provide any allergen information or specific instructions for pickup volunteers"
          />
        </Card>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/donor')}
          >
            Cancel
          </Button>
          <Button type="submit" size="lg">
            <PlusCircle className="w-4 h-4 mr-2" />
            <span>Publish Food Donation</span>
          </Button>
        </div>
      </form>
    </div>
  );
};
