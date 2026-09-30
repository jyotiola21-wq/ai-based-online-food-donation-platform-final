import React, { createContext, useContext, useState, useEffect } from 'react';
import { DonationItem, DonationStatus } from '../types';

interface DonationContextType {
  donations: DonationItem[];
  addDonation: (donation: Omit<DonationItem, 'id' | 'status' | 'createdAt'>) => DonationItem;
  requestDonation: (donationId: string, ngoId: string, ngoName: string, notes?: string) => void;
  acceptDonation: (donationId: string) => void;
  completeDonation: (donationId: string) => void;
  cancelDonation: (donationId: string) => void;
  clearAllDonations: () => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

const STORAGE_KEY = 'food_donation_items';

export const DonationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Empty state by default as required by data rules
  const [donations, setDonations] = useState<DonationItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(donations));
    } catch {
      // Ignore
    }
  }, [donations]);

  const addDonation = (donationData: Omit<DonationItem, 'id' | 'status' | 'createdAt'>): DonationItem => {
    const newItem: DonationItem = {
      ...donationData,
      id: 'don_' + Date.now(),
      status: 'available',
      createdAt: new Date().toISOString(),
    };
    setDonations(prev => [newItem, ...prev]);
    return newItem;
  };

  const requestDonation = (donationId: string, ngoId: string, ngoName: string, notes?: string) => {
    setDonations(prev =>
      prev.map(item =>
        item.id === donationId
          ? {
              ...item,
              status: 'requested' as DonationStatus,
              requestedByNgoId: ngoId,
              requestedByNgoName: ngoName,
              requestNotes: notes,
            }
          : item
      )
    );
  };

  const acceptDonation = (donationId: string) => {
    setDonations(prev =>
      prev.map(item =>
        item.id === donationId
          ? {
              ...item,
              status: 'accepted' as DonationStatus,
              acceptedAt: new Date().toISOString(),
            }
          : item
      )
    );
  };

  const completeDonation = (donationId: string) => {
    setDonations(prev =>
      prev.map(item =>
        item.id === donationId
          ? {
              ...item,
              status: 'completed' as DonationStatus,
              completedAt: new Date().toISOString(),
            }
          : item
      )
    );
  };

  const cancelDonation = (donationId: string) => {
    setDonations(prev =>
      prev.map(item =>
        item.id === donationId
          ? {
              ...item,
              status: 'cancelled' as DonationStatus,
            }
          : item
      )
    );
  };

  const clearAllDonations = () => {
    setDonations([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  return (
    <DonationContext.Provider
      value={{
        donations,
        addDonation,
        requestDonation,
        acceptDonation,
        completeDonation,
        cancelDonation,
        clearAllDonations,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonations = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonations must be used within a DonationProvider');
  }
  return context;
};
