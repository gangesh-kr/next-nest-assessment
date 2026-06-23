'use client';

import React from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import { TextField, DialogActions, Button, Box } from '@mui/material';
import { UserFormValues } from '@/types/user';
import { userValidationSchema } from '@/validation/schema';

interface UserFormProps {
  initialValues: UserFormValues;
  onSubmit: (values: UserFormValues, helpers: FormikHelpers<UserFormValues>) => void;
  onCancel: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialValues, onSubmit, onCancel }) => {
  return (
    <Formik<UserFormValues>
      initialValues={initialValues}
      validationSchema={userValidationSchema}
      onSubmit={onSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              fullWidth
              id="first_name"
              name="first_name"
              label="First Name"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.first_name && Boolean(errors.first_name)}
              helperText={touched.first_name && errors.first_name}
            />
            <TextField
              fullWidth
              id="last_name"
              name="last_name"
              label="Last Name"
              value={values.last_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.last_name && Boolean(errors.last_name)}
              helperText={touched.last_name && errors.last_name}
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
          </Box>
          <DialogActions sx={{ px: 0, pt: 3 }}>
            <Button onClick={onCancel} color="inherit">
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
