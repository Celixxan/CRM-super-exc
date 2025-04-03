'use client';

import React, { useState, ChangeEvent, useMemo } from 'react';
import Snackbar from '@/components/common/Snackbar';
import SearchBar from '@/components/common/SearchBar';
import FilterSelect from '@/components/common/FilterSelect';
import { Customer, CustomerFormData } from '@/types';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useGetCustomersQuery, useCreateCustomerMutation } from '@/lib/api/apiSlice';
import MainLayout from '@/components/layout/MainLayout';

const statusOptions = ['Active', 'Inactive', 'Lead', 'Opportunity'];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<CustomerFormData>({
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'Active',
    notes: '',
  });

  const { data: customers, isLoading } = useGetCustomersQuery(undefined);

  const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, companyName: e.target.value });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const [firstName, lastName] = e.target.value.split(' ');
    setFormData({ ...formData, firstName, lastName });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, phone: e.target.value });
  };

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, status: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
    setOpen(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      status: 'Active',
      companyName: '',
      notes: '',
    });
    setOpen(false);
    setFormData({
      companyName: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      status: 'Active',
      notes: '',
    });
  };

  const [createCustomer] = useCreateCustomerMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCustomer(formData).unwrap();
      setSnackbar({
        open: true,
        message: 'Customer created successfully',
        severity: 'success',
      });
      handleClose();
    } catch (error) {
      console.error('Failed to create customer:', error);
      setSnackbar({
        open: true,
        message: 'Failed to create customer. Please try again.',
        severity: 'error',
      });
    }
  };

  const filteredCustomers = useMemo(() => {
    if (!customers?.data?.customers) return [];
    return customers.data.customers.filter((customer: Customer) => {
      const matchesSearch = searchQuery === '' ||
        customer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.companyName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === '' || customer.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchQuery, statusFilter]);

  if (isLoading) {
    return (
      <MainLayout>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Box sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1">
            Customers
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add Customer
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <SearchBar
              placeholder="Search customers..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </Box>
          <FilterSelect
            label="Status"
            value={statusFilter}
            options={statusOptions}
            onChange={setStatusFilter}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer: Customer) => (
                <TableRow key={customer.id}>
                  <TableCell>{customer.companyName || '-'}</TableCell>
                  <TableCell>
                    {`${customer.firstName} ${customer.lastName}`}
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone || '-'}</TableCell>
                  <TableCell>{customer.status}</TableCell>
                  <TableCell>
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Customer</DialogTitle>
          <DialogContent>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { my: 1 },
                minWidth: '500px',
              }}
            >
              <TextField
                fullWidth
                label="Company Name"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData({ ...formData, companyName: e.target.value })
                }
              />
              <TextField
                fullWidth
                required
                label="First Name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
              <TextField
                fullWidth
                required
                label="Last Name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
              <TextField
                fullWidth
                required
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
              <TextField
                fullWidth
                required
                select
                label="Status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                {statusOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              Add Customer
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        />
      </Box>
    </MainLayout>
  );
}
