export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export type UserFormValues = Omit<User, 'id'>;

export type ModalMode = 'create' | 'edit' | null;

export interface UsersContextValue {
  users: User[];
  addUser: (values: UserFormValues) => void;
  updateUser: (id: number, values: UserFormValues) => void;
  modalOpen: boolean;
  modalMode: ModalMode;
  selectedUser: User | null;
  openCreateModal: () => void;
  openEditModal: (user: User) => void;
  closeModal: () => void;
}
