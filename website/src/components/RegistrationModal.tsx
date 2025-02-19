import React, { useState, FormEvent, ChangeEvent } from 'react';
import { X } from 'lucide-react';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  product: any | null;
}

interface RegisterFormData {
  name: string;
  email: string;
  mobile: string;
}

interface LoginFormData {
  mobile: string;
  pin: string;
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onLoginSuccess, product }) => {
  const [activeTab, setActiveTab] = useState<'register' | 'login'>('register');
  const [step, setStep] = useState<'register' | 'otp' | 'success'>('register');
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    mobile: ''
  });
  const [loginData, setLoginData] = useState<LoginFormData>({
    mobile: '',
    pin: ''
  });
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const generateDeviceId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };

  const fetchFromSupabase = async (endpoint: string, method: string, body: any = null) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'apikey': SUPABASE_ANON_KEY,
    };

    const options: RequestInit = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, options);
      
      // Check if there's content to parse
      const contentType = response.headers.get("content-type");
      
      if (response.status === 201 || response.status === 204) {
        return { success: true, status: response.status };
      }

      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'An error occurred');
        }
        return data;
      } else {
        if (!response.ok) {
          throw new Error('An error occurred');
        }
        return { success: true, status: response.status };
      }
    } catch (error) {
      console.error('Error fetching Supabase API:', error);
      throw error;
    }
  };

  const registerUserProfile = async () => {
    const deviceId = generateDeviceId();
    const profileData = {
      phone_number: formData.mobile,
      device_id: deviceId,
      email: formData.email,
      full_name: formData.name,
      pin: Math.floor(1000 + Math.random() * 9000).toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      status: 'active'
    };

    try {
      const response = await fetchFromSupabase(
        'profiles?select=*',
        'POST',
        profileData
      );

      localStorage.setItem('phoneNumber', formData.mobile);
      localStorage.setItem('deviceId', deviceId);
      
      return response[0] || null;
    } catch (error) {
      console.error('Profile registration error:', error);
      throw error;
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    if (activeTab === 'register') {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    } else {
      setLoginData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const validateRegisterForm = (): boolean => {
    if (!formData.name || !formData.email || !formData.mobile) {
      setError('All fields are required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }
    return true;
  };

  const validateLoginForm = (): boolean => {
    if (!loginData.mobile || !loginData.pin) {
      setError('All fields are required');
      return false;
    }
    if (!/^\d{10}$/.test(loginData.mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }
    if (!/^\d{4}$/.test(loginData.pin)) {
      setError('Please enter a valid 4-digit PIN');
      return false;
    }
    return true;
  };

  const handleRegisterSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    
    if (!validateRegisterForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStep('otp');
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    
    if (!validateLoginForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetchFromSupabase(
        `profiles?phone_number=eq.${loginData.mobile}&pin=eq.${loginData.pin}&select=*`,
        'GET'
      );

      if (Array.isArray(response) && response.length > 0) {
        localStorage.setItem('phoneNumber', loginData.mobile);
        setStep('success');
        onLoginSuccess();
      } else {
        setError('Invalid mobile number or PIN');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');

    if (!otp) {
      setError('Please enter OTP');
      return;
    }

    setIsLoading(true);
    try {
      await registerUserProfile();
      setStep('success');
      onLoginSuccess();
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('register');
    setActiveTab('register');
    setFormData({
      name: '',
      email: '',
      mobile: ''
    });
    setLoginData({
      mobile: '',
      pin: ''
    });
    setOtp('');
    setError('');
    onClose();
  };

  const handleTabChange = (tab: 'register' | 'login') => {
    setActiveTab(tab);
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>

        {step === 'register' && (
          <>
            <div className="flex mb-6 border-b">
              <button
                className={`flex-1 py-2 text-center ${
                  activeTab === 'register'
                    ? 'text-[#4a9f45] border-b-2 border-[#4a9f45] font-semibold'
                    : 'text-gray-500'
                }`}
                onClick={() => handleTabChange('register')}
              >
                Register
              </button>
              <button
                className={`flex-1 py-2 text-center ${
                  activeTab === 'login'
                    ? 'text-[#4a9f45] border-b-2 border-[#4a9f45] font-semibold'
                    : 'text-gray-500'
                }`}
                onClick={() => handleTabChange('login')}
              >
                Login
              </button>
            </div>

            {activeTab === 'register' ? (
              <form onSubmit={handleRegisterSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 bg-[#4a9f45] text-white py-2 rounded-lg hover:bg-[#3d8438] transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Continue'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleLoginSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mobile</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={loginData.mobile}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">PIN</label>
                    <input
                      type="password"
                      name="pin"
                      value={loginData.pin}
                      onChange={handleInputChange}
                      maxLength={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 bg-[#4a9f45] text-white py-2 rounded-lg hover:bg-[#3d8438] transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Processing...' : 'Login'}
                </button>
              </form>
            )}
          </>
        )}

        {step === 'otp' && (
          <>
            <h2 className="text-2xl font-bold mb-6">Enter OTP</h2>
            <form onSubmit={handleOtpSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 p-2 border"
                  maxLength={6}
                />
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 bg-[#4a9f45] text-white py-2 rounded-lg hover:bg-[#3d8438] transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          </>
        )}

        {step === 'success' && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              {activeTab === 'register' ? 'Registration Successful!' : 'Login Successful!'}
            </h2>
            <p className="text-gray-600 mb-6">
              {activeTab === 'register'
                ? 'You have successfully registered.'
                : 'You have successfully logged in.'}
            </p>
            <button
              onClick={handleClose}
              className="bg-[#4a9f45] text-white py-2 px-6 rounded-lg hover:bg-[#3d8438] transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterModal;