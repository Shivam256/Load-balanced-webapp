import { styled, Box } from '@mui/material';
import palette from '../../theme/palette';

export const LoginPage = styled(Box)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  backgroundColor: palette.backgrond1,
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
}));

export const SectionsContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
}));

export const LottieContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  flex: 1,
  display: 'grid',
  placeItems: 'center',
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const LoginFormContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '50px',
}));

export const LoginCard = styled(Box)(({ theme }) => ({
  width: '60%',
  height: 'fit-content',
  padding: '30px 20px',
  borderRadius: '30px',
  boxShadow: '24px 24px 48px #e7e9e9,-24px -24px 48px #ffffff',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    width: '90%',
  },
}));
