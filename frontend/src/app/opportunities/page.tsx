'use client';

import React, { useState, ChangeEvent, useMemo } from 'react';
import SearchBar from '@/components/common/SearchBar';
import FilterSelect from '@/components/common/FilterSelect';
import Snackbar from '@/components/common/Snackbar';
import { Opportunity, OpportunityFormData } from '@/types';
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
import { useGetOpportunitiesQuery, useCreateOpportunityMutation } from '@/lib/api/apiSlice';
import MainLayout from '@/components/layout/MainLayout';

const statusOptions = ['New', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

export default function OpportunitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState('');
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error' | 'info' | 'warning',
  });
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<OpportunityFormData>({
    customerId: '',
    stage: 'New',
    value: 0,
    probability: 0,
    expectedCloseDate: '',
    notes: '',
  });

  const { data: opportunities, isLoading } = useGetOpportunitiesQuery(undefined);

  const filteredOpportunities = useMemo(() => {
    if (!opportunities?.data?.opportunities) return [];
    return opportunities.data.opportunities.filter((opportunity: Opportunity) => {
      const matchesSearch = searchQuery === '' ||
        opportunity.customerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opportunity.notes?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStage = stageFilter === '' || opportunity.stage === stageFilter;
      
      return matchesSearch && matchesStage;
    });
  }, [opportunities, searchQuery, stageFilter]);

  const handleProbabilityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, probability: Number(e.target.value) });
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, customerId: e.target.value });
  };

  const handleStageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, stage: e.target.value });
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, value: Number(e.target.value) });
  };

  const handleExpectedCloseDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, expectedCloseDate: e.target.value });
  };

  const handleNotesChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, notes: e.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
    setOpen(false);
    setFormData({
      customerId: '',
      value: 0,
      stage: 'New',
      probability: 0,
      expectedCloseDate: '',
      notes: '',
    });
    setOpen(false);
    setFormData({
      customerId: '',
      stage: 'New',
      value: 0,
      probability: 0,
      expectedCloseDate: '',
      notes: '',
    });
  };

  const [createOpportunity] = useCreateOpportunityMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createOpportunity(formData).unwrap();
      setSnackbar({
        open: true,
        message: 'Opportunity created successfully',
        severity: 'success',
      });
      handleClose();
    } catch (error) {
      console.error('Failed to create opportunity:', error);
      setSnackbar({
        open: true,
        message: 'Failed to create opportunity. Please try again.',
        severity: 'error',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'primary';
      case 'Qualified':
        return 'info';
      case 'Proposal':
        return 'warning';
      case 'Negotiation':
        return 'secondary';
      case 'Closed Won':
        return 'success';
      case 'Closed Lost':
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
            Opportunities
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add Opportunity
          </Button>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Box sx={{ flex: 1 }}>
            <SearchBar
              placeholder="Search opportunities..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </Box>
          <FilterSelect
            label="Stage"
            value={stageFilter}
            options={statusOptions}
            onChange={setStageFilter}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Opportunities
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add Opportunity
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Probability</TableCell>
                <TableCell>Expected Close</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOpportunities.map((opportunity: Opportunity) => (
                <TableRow key={opportunity.id}>
                  <TableCell>{opportunity.customerId}</TableCell>
                  <TableCell>
                    <Chip
                      label={opportunity.stage}
                      color={getStatusColor(opportunity.stage) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>${opportunity.value.toString()}</TableCell>
                  <TableCell>
                    {opportunity.probability
                      ? `${opportunity.probability}%`
                      : '-'}
                  </TableCell>
                  <TableCell>
                    {opportunity.expectedCloseDate
                      ? new Date(
                          opportunity.expectedCloseDate
                        ).toLocaleDateString()
                      : '-'}
                  </TableCell>
                  <TableCell>{opportunity.notes || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Opportunity</DialogTitle>
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
                label="Status"
                value={formData.stage}
                onChange={(e) =>
                  setFormData({ ...formData, stage: e.target.value })
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
                required
                label="Value"
                type="number"
                value={formData.value}
                onChange={(e) =>
                  setFormData({ ...formData, value: Number(e.target.value) })
                }
              />
              <TextField
                fullWidth
                label="Probability (%)"
                type="number"
                value={formData.probability}
                onChange={(e) =>
                  setFormData({ ...formData, probability: Number(e.target.value) })
                }
              />
              <TextField
                fullWidth
                label="Expected Close Date"
                type="date"
                value={formData.expectedCloseDate}
                onChange={(e) =>
                  setFormData({ ...formData, expectedCloseDate: e.target.value })
                }
                InputLabelProps={{
                  shrink: true,
                }}
              />
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
              Add Opportunity
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
