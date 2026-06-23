'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import { FormikHelpers } from 'formik';
import { User, UserFormValues, ModalMode } from '@/types/user';
import UserForm from './UserForm';

interface UserModalProps {
  open: boolean;
  mode: ModalMode;
  selectedUser: User | null;
  onSubmit: (values: UserFormValues) => void;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ open, mode, selectedUser, onSubmit, onClose }) => {
  const title = mode === 'create' ? 'Add User' : 'Edit User';

  const initialValues: UserFormValues = selectedUser
    ? {
        first_name: selectedUser.first_name,
        last_name: selectedUser.last_name,
        email: selectedUser.email,
      }
    : {
        first_name: '',
        last_name: '',
        email: '',
      };

  const handleSubmit = (values: UserFormValues, helpers: FormikHelpers<UserFormValues>) => {
    onSubmit(values);
    helpers.setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <UserForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
