import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { addUser, removeUser, editUser } from '../Redux/UserSlice';
import { FaPencilAlt } from 'react-icons/fa';
import { FaTrashCan } from 'react-icons/fa6';
import Modal from './Modal';

interface UserFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const UserForm: React.FC = () => {
  const initialFormState: UserFormState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  const [formState, setFormState] = useState<UserFormState>(initialFormState);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserFormState | null>(null);

  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // Validation logic
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formState.firstName.trim()) {
      errors.firstName = 'First Name is required';
    }
    if (!formState.lastName.trim()) {
      errors.lastName = 'Last Name is required';
    }
    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formState.phone.trim()) {
      errors.phone = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formState.phone)) {
      errors.phone = 'Phone Number should be 10 digits';
    }

    return errors;
  };

  const handleCreateUser = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
    } else {
      dispatch(addUser(formState));
      setFormState(initialFormState);
      setFormErrors({});
    }
  };

  const handleDeleteUser = (email: string) => {
    dispatch(removeUser(email));
  };

  const handleEditUser = (user: UserFormState) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (updatedUser: UserFormState) => {
    dispatch(editUser(updatedUser));
    setSelectedUser(null);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="w-full h-[4rem] bg-white text-center shadow-lg flex items-center justify-center">
        <h2 className="text-2xl sm:text-4xl text-blue-600 font-bold">immence</h2>
      </nav>

      <div className="flex flex-col lg:flex-row justify-center lg:p-10 p-4 bg-gray-100 min-h-screen">
        {/* left section */}
        <div className="w-full lg:w-1/2 p-4 lg:p-10">
          <h2 className="text-xl lg:text-2xl font-semibold text-black mb-6">Create User</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-blue-600 font-semibold mb-2">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formState.firstName}
                onChange={handleInputChange}
                placeholder="Enter your first name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {formErrors.firstName && <p className="text-red-500 text-sm">{formErrors.firstName}</p>}
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formState.lastName}
                onChange={handleInputChange}
                placeholder="Enter your last name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {formErrors.lastName && <p className="text-red-500 text-sm">{formErrors.lastName}</p>}
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formState.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
            </div>
            <div>
              <label className="block text-blue-600 font-semibold mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formState.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
              {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
            </div>
            <div>
              <button
                type="button"
                onClick={handleCreateUser}
                className="bg-blue-600 text-white font-bold py-3 px-4 w-auto rounded-md"
              >
                Create
              </button>
            </div>
          </form>
        </div>

        {/* right section */}
        <div className="w-full lg:w-1/2 p-4 lg:p-10">
          <h2 className="text-xl lg:text-2xl font-semibold text-black mb-6">Details</h2>
          {users.length > 0 ? (
            <div className="space-y-4">
              {users.map((user) => (
                <div
                  key={user.email}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
                >
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center">
                      {user.firstName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold">{`${user.firstName} ${user.lastName}`}</h4>
                      <p className="text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex space-x-3">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEditUser(user)}>
                      <FaPencilAlt />
                    </button>
                    <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteUser(user.email)}>
                      <FaTrashCan />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 font-semibold">
              No User Found
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedUser && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveUser}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default UserForm;
