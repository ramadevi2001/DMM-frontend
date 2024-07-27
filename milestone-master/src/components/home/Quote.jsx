import React from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, CardHeader } from "@mui/material";
import styles from "./css/Quote.module.css";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  width: "600px",
  border: "2px solid white",
  [theme.breakpoints.down('sm')]: {
    flexDirection: "column",
    width: "100%",
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  width: "100%",
  objectFit: "scale-down",
  border: "1px solid white",
  borderRadius: "3px",
  [theme.breakpoints.down('sm')]: {
    height: "auto",
  },
}));

const StyledCardContent = styled(Box)(({ theme }) => ({
  flex: 8,
  backgroundColor: "rgb(21, 100, 104)",
  color: "white",
  [theme.breakpoints.down('sm')]: {
    textAlign: "center",
  },
}));

const Quote = ({ image, quote, book, author }) => {
  return (
    <StyledCard className={styles.quoteCard}>
      <Box sx={{ flex: 4 }}>
        <StyledCardMedia
          className={styles.quoteCardMedia}
          image={image}
          title="Role Model"
        />
      </Box>
      <StyledCardContent className={styles.quoteCardContent}>
        <CardHeader title={book} />
        <CardContent>
          <Typography variant="caption" className={styles.quoteText}>
            <b>{quote}</b>
          </Typography>
        </CardContent>
        <Typography variant="body2" className={styles.quoteAuthor}>
          {author}
        </Typography>
      </StyledCardContent>
    </StyledCard>
  );
};

export default Quote;
