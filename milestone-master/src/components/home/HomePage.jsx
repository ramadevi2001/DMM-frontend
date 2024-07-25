import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import quoteImage from './assets/bj_fogg.jpg';
const Homepage = () => {
    return (
        <>
         <AppBar position="static" sx={{ bgcolor: 'white' }}> {/* Header background white */}
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box display="flex" alignItems="center">
                        <img src="/path-to-logo.png" alt="Logo" style={{ height: '40px' }} />
                    </Box>
                    <Box>
                        <Typography variant="h4" sx={{ color: '#66696d' }} gutterBottom> {/* Text color light brown */}
                            Milestone Master
                        </Typography>
                    </Box>
                    <Box>
                        <Button sx={{ bgcolor: 'white', color: 'black', marginRight: '10px' }}>Login</Button>
                        <Button sx={{ bgcolor: 'white', color: 'black' }}>Signup</Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box
            sx={{
                minHeight: '100vh',
                bgcolor: 'rgb(21 100 104)', // Background color cyan
                color: '#66696d', // Text color light brown
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'hidden', // Remove vertical scroll
            }}
        >
            {/* Header */}
           

            {/* Main Content */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="calc(100vh - 64px - 40px)" // Adjust height to fit within viewport minus header and padding
                sx={{ width: '100%', maxWidth: '800px', margin: '20px' }}
            >
                <Card sx={{ display: 'flex', width: '70%', bgcolor: 'white', color: '#66696d', borderRadius:"20px" }}> {/* Card text color light brown */}
                    <CardMedia
                        component="img"
                        sx={{ width: '40%' }} // Adjust width to 50% to properly bisect
                        image={quoteImage}
                        alt="Quote Image"
                    />
                    <CardContent sx={{ width: '60%', bgcolor:'white' }}>
                        <Typography variant="h5" gutterBottom>
                            Quote Title
                        </Typography>
                        <Typography variant="body1">
                            "This is a beautiful quote that is displayed here to inspire users."
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
        </>
       
    );
};

export default Homepage;
