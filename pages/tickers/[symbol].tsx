import { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, FormControlLabel } from '@mui/material';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface SymbolProps {
  symbol: string;
}

interface ApiResponse {
  ticker: {
    symbol: string;
    name: string;
    type: string;
  };
  similar_tickers: {
    symbol: string;
    name: string;
    type: string;
  }[];
}

export default function Symbol({ symbol }: SymbolProps) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [showETFs, setShowETFs] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://tickertwins-backend-vct4oolaqq-ue.a.run.app/tickers/${symbol}/similar`);
      const result: ApiResponse = await response.json();
      setData(result);
    };
    fetchData();
  }, [symbol]);

  if (!data) {
    return <div>Loading...</div>;
  }

  const filteredSimilarTickers = showETFs
    ? data.similar_tickers
    : data.similar_tickers.filter(ticker => ticker.type !== 'ETF');

  return (
    <>
      <Typography variant="h4" component="h1">
        {data.ticker.name} ({data.ticker.symbol})
      </Typography>
      <FormControlLabel
        control={<Checkbox checked={showETFs} onChange={e => setShowETFs(e.target.checked)} />}
        label="Show ETFs"
        style={{ float: 'right' }}
      />
      <TableContainer style={{ maxHeight: '60vh', overflow: 'auto' }}> {/* Add fixed height and scrollable style */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell> {/* Add new column header for row number */}
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSimilarTickers.map((ticker, index) => (
              <TableRow key={ticker.symbol}>
                <TableCell>{index + 1}</TableCell> {/* Add new column for row number */}
                <TableCell>
                  <Link href={`/tickers/${ticker.symbol}`} style={{ color:"black" }} passHref>
                    {ticker.symbol}
                  </Link>
                </TableCell>
                <TableCell>{ticker.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

Symbol.getInitialProps = async ({ query }: NextPageContext): Promise<SymbolProps> => {
  const symbol = query.symbol as string;
  return { symbol };
};
