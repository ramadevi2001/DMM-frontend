import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Quote = ({heading, message}) => {
  return (
    <Card
      sx={{
        maxWidth: "100%",
        marginTop: '1%',
        borderRadius: 12,
        padding: '10px',
        boxShadow: '0 6px 10px rgba(0,0,0,0.2)',
        background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
      }}
    >
      <CardContent sx={{ textAlign: 'center', color: '#4a4a4a' }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontSize: '1.8rem',
            color: '#3f51b5',
            marginBottom: '2px',
          }}
        >
          {heading}
        </Typography>
        <Typography
          sx={{
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: '1.5rem',
            color: '#2e2e2e',
          }}
        >
          {message}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Quote;
