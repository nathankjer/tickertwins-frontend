import React, { useState } from 'react';
import { Typography, Link } from '@mui/material';

interface TruncatedTextProps {
  text: string;
  maxLength: number;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ text, maxLength }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  const truncatedText = text.slice(0, maxLength) + '...';

  const handleToggleTruncated = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault();
    setIsTruncated(!isTruncated);
  };

  return (
    <>
      <Typography paragraph>
        {isTruncated ? truncatedText : text}
        <Link href="#" onClick={handleToggleTruncated}>
          {isTruncated ? ' Show more' : ' Show less'}
        </Link>
      </Typography>
    </>
  );
};

export default TruncatedText;