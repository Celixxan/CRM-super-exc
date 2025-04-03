'use client';

import React, { useState, ChangeEvent, useMemo } from 'react';
import Snackbar from '@/components/common/Snackbar';
import SearchBar from '@/components/common/SearchBar';
import FilterSelect from '@/components/common/FilterSelect';
import { Lead, LeadFormData } from '@/types';
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
  Chip,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useGetLeadsQuery, useCreateLeadMutation } from '@/lib/api/apiSlice';
import MainLayout from '@/components/layout/MainLayout';

const statusOptions = ['New', 'Contacted', 'Qualified', 'Lost'];
const sourceOptions = [
  'Website',
  'Referral',
  'Social Media',
  'Email Campaign',
  'Trade Show',
  'Other',
];

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<LeadFormData>({
    customerId: '',
    source: 'Website',
    status: 'New',
    notes: '',
  });

  const { data: leads, isLoading } = useGetLeadsQuery(undefined);

  const filteredLeads = useMemo(() => {
    if (!leads?.data?.leads) return [];
    return leads.data.leads.filter((lead: Lead) => {
      const matchesSearch = searchQuery === '' ||
        lead.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.notes?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === '' || lead.status === statusFilter;
      const matchesSource = sourceFilter === '' || lead.source === sourceFilter;
      
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [leads, searchQuery, statusFilter, sourceFilter]);

  const handleCompanyChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOpen(true);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOpen(false);
    setFormData({
      customerId: '',
      source: 'Website',
      status: 'New',
      notes: '',
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
    setOpen(false);
    setFormData({
      customerId: '',
      source: 'Website',
      status: 'New',
      notes: '',
    });
    setOpen(false);
    setFormData({
      customerId: '',
      source: 'Website',
      status: 'New',
      notes: '',
    });
  };

  const [createLead] = useCreateLeadMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLead(formData).unwrap();
      setSnackbar({
        open: true,
        message: 'Lead created successfully',
        severity: 'success',
      });
      handleClose();
    } catch (error) {
      console.error('Failed to create lead:', error);
      setSnackbar({
        open: true,
        message: 'Failed to create lead. Please try again.',
        severity: 'error',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'primary';
      case 'Contacted':
        return 'info';
      case 'Qualified':
        return 'success';
      case 'Lost':
        return 'error';
      default:
        return 'default';
    }
  };

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
            Leads
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add Lead
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <SearchBar
              placeholder="Search leads..."
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
          <FilterSelect
            label="Source"
            value={sourceFilter}
            options={sourceOptions}
            onChange={setSourceFilter}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer ID</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Notes</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredLeads.map((lead: Lead) => (
                <TableRow key={lead.id}>
                  <TableCell>{lead.customerId}</TableCell>
                  <TableCell>{lead.source}</TableCell>
                  <TableCell>
                    <Chip
                      label={lead.status}
                      color={getStatusColor(lead.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{lead.notes || '-'}</TableCell>
                  <TableCell>
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Lead</DialogTitle>
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
                required
                select
                label="Source"
                value={formData.source}
                onChange={(e) =>
                  setFormData({ ...formData, source: e.target.value })
                }
              >
                {sourceOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
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
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              Add Lead
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
