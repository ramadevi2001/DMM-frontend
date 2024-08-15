import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatDate = (date) => {
  const d = new Date(date);
  const month = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  const year = d.getFullYear();
  return `${year}-${month}-${day} ${d.toLocaleTimeString()}`;
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const ProductivityChartPopup = ({ open, handleClose, data }) => {
  // Function to process data, filling in missing start_time with zero productivity
  const processData = (data) => {
    if (!data || data.length === 0) return [];

    // Create a shallow copy of the data array and sort it by start_time
    const sortedData = [...data].sort((a, b) => new Date(a.start_time) - new Date(b.start_time));

    const processedData = [];
    let currentTime = new Date(sortedData[0].start_time);

    sortedData.forEach((item) => {
      let itemTime = new Date(item.start_time);

      // Fill in the missing times with zero productivity
      while (currentTime < itemTime) {
        processedData.push({
          start_time: formatDate(currentTime),
          productivity: 0,
        });
        currentTime = addDays(currentTime, 1); // Assumes a daily chart; adjust as needed
      }

      processedData.push({
        start_time: formatDate(itemTime),
        productivity: item.productivity,
      });

      currentTime = addDays(currentTime, 1);
    });

    return processedData;
  };

  const chartData = processData(data);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Productivity Chart</DialogTitle>
      <DialogContent>
        <Box height={400}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="start_time" tickFormatter={(tick) => {
                const date = new Date(tick);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }} />
              <YAxis />
              <Tooltip labelFormatter={(label) => new Date(label).toLocaleString()} />
              <Line type="monotone" dataKey="productivity" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductivityChartPopup;
