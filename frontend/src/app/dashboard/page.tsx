'use client';

import { useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  People,
  TrendingUp,
  Business,
  MonetizationOn,
} from '@mui/icons-material';
import { useGetCustomersQuery, useGetLeadsQuery, useGetOpportunitiesQuery } from '@/lib/api/apiSlice';
import MainLayout from '@/components/layout/MainLayout';

export default function DashboardPage() {
  const { data: customers, isLoading: loadingCustomers } = useGetCustomersQuery(undefined);
  const { data: leads, isLoading: loadingLeads } = useGetLeadsQuery(undefined);
  const { data: opportunities, isLoading: loadingOpportunities } = useGetOpportunitiesQuery(undefined);

  const isLoading = loadingCustomers || loadingLeads || loadingOpportunities;

  const stats = [
    {
      title: 'Total Customers',
      value: customers?.data?.customers?.length || 0,
      icon: <People sx={{ fontSize: 40 }} />,
      color: '#1976d2',
    },
    {
      title: 'Active Leads',
      value: leads?.data?.leads?.length || 0,
      icon: <TrendingUp sx={{ fontSize: 40 }} />,
      color: '#2e7d32',
    },
    {
      title: 'Open Opportunities',
      value: opportunities?.data?.opportunities?.length || 0,
      icon: <Business sx={{ fontSize: 40 }} />,
      color: '#ed6c02',
    },
    {
      title: 'Total Pipeline Value',
      value: opportunities?.data?.opportunities?.reduce(
        (acc: number, opp: any) => acc + parseFloat(opp.value),
        0
      ).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }) || '$0',
      icon: <MonetizationOn sx={{ fontSize: 40 }} />,
      color: '#9c27b0',
    },
  ];

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
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid key={stat.title} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 3' } }}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    p: 1,
                    borderRadius: '50%',
                    backgroundColor: `${stat.color}20`,
                    mb: 2,
                  }}
                >
                  {stat.icon}
                </Box>
                <Typography variant="h6" component="div">
                  {stat.value}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  align="center"
                >
                  {stat.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainLayout>
  );
}
