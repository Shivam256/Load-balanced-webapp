import { useEffect, useState } from 'react';
import PieChartComponent from './PieChart';
import { Typography, Box } from '@mui/material';
import Lottie from 'react-lottie';
import * as S from '../login/login.styles.jsx';
import NotFound from '../../assets/notFound.json';

const PieChartCard = ({ data }) => {
  //console.log(data);
  const [isEmpty, setIsEmpty] = useState(true);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: NotFound,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const COLORS = [
    ['#0088FE', data[0].name],
    ['#00C49F', data[1].name],
    ['#FFBB28', data[2].name],
  ];
  useEffect(() => {
    if (
      data &&
      data[0].value === 0 &&
      data[1].value === 0 &&
      data[2].value === 0
    ) {
      setIsEmpty(true);
      //console.log('bruh');
    } else {
      setIsEmpty(false);
    }
  }, [data]);

  return isEmpty ? (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '2rem',
      }}
    >
      <S.LottieContainer>
        <Lottie options={defaultOptions} height="100%" width="80%" />
      </S.LottieContainer>
    </Box>
  ) : (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Box sx={{ width: '50%', height: '100%' }}>
        <PieChartComponent data={data} />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '40%',
          height: '70%',
        }}
      >
        {COLORS.map((c) => (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
              height: '100%',
            }}
          >
            <Box
              sx={{
                backgroundColor: c[0],
                width: '1rem',
                height: '1rem',
                marginRight: '0.4rem',
              }}
            ></Box>
            <Box>{c[1]}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
export default PieChartCard;