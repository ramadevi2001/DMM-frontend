import { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import Quote from "./Quote";
import { Box } from "@mui/material";
import jamesClear from "../../assets/images/James_Clear.jpg";
import CharlessDuhigg from "../../assets/images/Charles_Duhigg.jpg";
import DarrenHardy from "../../assets/images/Darren_Hardy.jpg";
import BJFogg from "../../assets/images/B_J_Fogg.jpg";
import GretchenRubin from "../../assets/images/Gretchen_Rubin.jpg";
import StephenCovey from "../../assets/images/Stephen_Covey.jpg";
import { useSpring, animated } from '@react-spring/web';
import styles from "./css/ReferenceBooks.module.css";

const ReferenceBooks = () => {
  const quotes = [
    {
      image: CharlessDuhigg,
      quote:
        "Change might not be fast and it isn't always easy. But with time and effort, almost any habit can be reshaped",
      book: "The Power of Habit",
      author: "Charles Duhigg",
    },
    {
      image: jamesClear,
      quote:
        "Never miss twice, If you miss one day, to get back on track as quickly as possible",
      book: "Atomic Habits",
      author: "James Clear",
    },
    {
      image: DarrenHardy,
      quote: `It's not the big things that add up in the end, 
        It's the hundreds of little things that separate the ordinary from the extraordinary`,
      book: "The Compound Effect",
      author: "Darren Hardy",
    },
    {
      image: BJFogg,
      quote: `Create a constellation of habits, tiny in size but big on impact`,
      book: "Tiny Habits",
      author: "B J Fogg",
    },
    {
      image: GretchenRubin,
      quote: `What you do every day matters more than what you do once in a while`,
      book: "Better Than Before",
      author: "Gretchen Rubin",
    },
    {
      image: StephenCovey,
      quote:
        "It's not what happens to us, but our response to what happens to us matters more",
      book: "The 7 Habits of Highly Effective People",
      author: "Stephen R. Covey",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  const goToQuote = (index) => {
    setCurrentIndex(index);
    setIsPaused(true);
    clearInterval(intervalRef.current);
    setTimeout(() => {
      setIsPaused(false);
    }, 5000);
  };

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      }, 3000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused, quotes.length]);

  const slideStyles = useSpring({
    transform: `translateX(-${currentIndex * 100}%)`,
  });

  return (
    <Box className={styles.container}>
      <Box className={styles.sliderContainer}>
        <animated.div
          style={{
            ...slideStyles,
          }}
          className={styles.animatedDiv}
        >
          {quotes.map((quote) => (
            <Box key={uuid()} className={styles.quoteBox}>
              <Quote
                image={quote.image}
                quote={quote.quote}
                book={quote.book}
                author={quote.author}
              />
            </Box>
          ))}
        </animated.div>
      </Box>
      <Box className={styles.dotContainer}>
        {quotes.map((_, index) => (
          <Box
            key={uuid()}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ""}`}
            onClick={() => goToQuote(index)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ReferenceBooks;
