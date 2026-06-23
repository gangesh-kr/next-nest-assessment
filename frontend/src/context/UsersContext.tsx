'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { User, UserFormValues, ModalMode, UsersContextValue } from '@/types/user';
import { INITIAL_USERS } from '@/constants/users';

const UsersContext = createContext<UsersContextValue | undefined>(undefined);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setModalMode(null);
    setSelectedUser(null);
  }, []);

  const addUser = useCallback((values: UserFormValues) => {
    const newUser: User = { id: Date.now(), ...values };
    setUsers((prev) => [newUser, ...prev]);
    closeModal();
  }, [closeModal]);

  const updateUser = useCallback((id: number, values: UserFormValues) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...values } : u)));
    closeModal();
  }, [closeModal]);

  const openCreateModal = useCallback(() => {
    setModalMode('create');
    setSelectedUser(null);
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((user: User) => {
    setModalMode('edit');
    setSelectedUser(user);
    setModalOpen(true);
  }, []);

  const value = useMemo<UsersContextValue>(() => ({
    users,
    modalOpen,
    modalMode,
    selectedUser,
    addUser,
    updateUser,
    openCreateModal,
    openEditModal,
    closeModal,
  }), [users, modalOpen, modalMode, selectedUser, addUser, updateUser, openCreateModal, openEditModal, closeModal]);

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
};

export const useUsers = (): UsersContextValue => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};
