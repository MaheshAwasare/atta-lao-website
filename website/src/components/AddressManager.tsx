import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Check, X } from 'lucide-react';

interface Address {
  id: string;
  profile_id: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  is_default: boolean;
  created_at: string;
}

const AddressManager = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newAddress, setNewAddress] = useState({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    is_default: false
  });

  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const fetchAddresses = async () => {
    const profileId = localStorage.getItem('phoneNumber');
    if (!profileId) return;

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/addresses?profile_id=eq.${profileId}&order=is_default.desc,created_at.desc`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'apikey': SUPABASE_ANON_KEY,
          },
        }
      );
      const data = await response.json();
      setAddresses(data);
    } catch (err) {
      setError('Failed to load addresses');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const profileId = localStorage.getItem('phoneNumber');
    if (!profileId) return;

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/addresses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_ANON_KEY,
        },
        body: JSON.stringify({
          ...newAddress,
          profile_id: profileId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsAddingAddress(false);
        setNewAddress({
          address_line1: '',
          address_line2: '',
          city: '',
          state: '',
          postal_code: '',
          is_default: false
        });
        fetchAddresses();
      }
    } catch (err) {
      setError('Failed to add address');
    }
  };

  const handleSetDefault = async (addressId: string) => {
    const profileId = localStorage.getItem('phoneNumber');
    if (!profileId) return;

    try {
      // First, set all addresses to non-default
      await fetch(
        `${SUPABASE_URL}/rest/v1/addresses?profile_id=eq.${profileId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'apikey': SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ is_default: false }),
        }
      );

      // Then set the selected address as default
      await fetch(
        `${SUPABASE_URL}/rest/v1/addresses?id=eq.${addressId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            'apikey': SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ is_default: true }),
        }
      );

      fetchAddresses();
    } catch (err) {
      setError('Failed to set default address');
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading addresses...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Addresses</h2>
          <button
            onClick={() => setIsAddingAddress(true)}
            className="flex items-center space-x-2 bg-[#4a9f45] text-white px-4 py-2 rounded-lg hover:bg-[#3d8438] transition-colors"
          >
            <Plus size={20} />
            <span>Add New Address</span>
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {isAddingAddress ? (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <form onSubmit={handleAddAddress}>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                  <input
                    type="text"
                    value={newAddress.address_line1}
                    onChange={(e) => setNewAddress({ ...newAddress, address_line1: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
                  <input
                    type="text"
                    value={newAddress.address_line2}
                    onChange={(e) => setNewAddress({ ...newAddress, address_line2: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                  <input
                    type="text"
                    value={newAddress.postal_code}
                    onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_default"
                    checked={newAddress.is_default}
                    onChange={(e) => setNewAddress({ ...newAddress, is_default: e.target.checked })}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_default" className="ml-2 block text-sm text-gray-700">
                    Set as default address
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#4a9f45] text-white rounded-md hover:bg-[#3d8438]"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            {addresses.map((address) => (
              <div key={address.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-[#4a9f45] mt-1" size={20} />
                    <div>
                      <div className="text-gray-800">
                        {address.address_line1}
                        {address.address_line2 && <>, {address.address_line2}</>}
                      </div>
                      <div className="text-gray-600">
                        {address.city}, {address.state} {address.postal_code}
                      </div>
                      {address.is_default && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                          Default Address
                        </span>
                      )}
                    </div>
                  </div>
                  {!address.is_default && (
                    <button
                      onClick={() => handleSetDefault(address.id)}
                      className="text-[#4a9f45] hover:text-[#3d8438] text-sm"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressManager;