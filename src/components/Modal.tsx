import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

interface UserFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formState: UserFormState) => void;
  user: UserFormState;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSave, user }) => {
  const [formState, setFormState] = useState<UserFormState>(user);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    setFormState(user);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { firstName: '', lastName: '', email: '', phone: '' };

    if (!formState.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (!formState.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    }

    if (!formState.phone.trim()) {
      newErrors.phone = 'Phone number is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formState);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <IoClose
          className="absolute top-3 right-3 text-gray-500 cursor-pointer"
          size={24}
          onClick={onClose}
        />
        <h2 className="text-2xl font-semibold mb-6">Edit Details</h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block text-blue-600 font-semibold mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formState.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {errors.firstName && (
                <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-blue-600 font-semibold mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formState.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {errors.lastName && (
                <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            <div>
              <label className="block text-blue-600 font-semibold mb-2">Email</label>
              <input
                type="text"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-blue-600 font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={handleSave}
              className="bg-blue-600 text-white font-bold p-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
