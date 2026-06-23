'use client';

import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UserTable from '@/components/UserTable';
import UserModal from '@/components/UserModal';
import { useUsers } from '@/context/UsersContext';

export default function UsersPage() {
  const {
    users,
    modalOpen,
    modalMode,
    selectedUser,
    addUser,
    updateUser,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useUsers();

  const handleSubmit = (values: { first_name: string; last_name: string; email: string }) => {
    if (modalMode === 'create') {
      addUser(values);
    } else if (modalMode === 'edit' && selectedUser) {
      updateUser(selectedUser.id, values);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Users
        </Typography>
        <Button
          id="add-user-button"
          variant="contained"
          startIcon={<AddIcon />}
          onClick={openCreateModal}
        >
          Add User
        </Button>
      </Box>

      <UserTable users={users} onEdit={openEditModal} />

      <UserModal
        open={modalOpen}
        mode={modalMode}
        selectedUser={selectedUser}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />
    </Container>
  );
}
