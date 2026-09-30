export type UserRole = 'donor' | 'ngo' | 'volunteer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationName?: string;
  phone?: string;
  address?: string;
  city?: string;
  registrationNumber?: string;
  vehicleType?: string;
}

export type FoodCategory =
  | 'Cooked Meals'
  | 'Raw Groceries'
  | 'Bakery Items'
  | 'Packaged Foods'
  | 'Fruits & Vegetables'
  | 'Beverages';

export type DonationStatus = 'available' | 'requested' | 'accepted' | 'completed' | 'cancelled';

export interface DonationItem {
  id: string;
  foodName: string;
  category: FoodCategory;
  quantity: string;
  preparationDateTime: string;
  expiryDateTime: string;
  pickupAddress: string;
  pickupCity: string;
  pickupLandmark?: string;
  contactPerson: string;
  contactPhone: string;
  description: string;
  freshnessNotes?: string;
  storageCondition?: 'Room Temperature' | 'Refrigerated' | 'Frozen' | 'Hot Held';
  status: DonationStatus;
  createdAt: string;
  donorId: string;
  donorName: string;
  requestedByNgoId?: string;
  requestedByNgoName?: string;
  requestNotes?: string;
  acceptedAt?: string;
  completedAt?: string;
}
