import { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, FormControlLabel, CircularProgress, TablePagination } from '@mui/material';
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    return <div style={{ textAlign: 'center' }}><CircularProgress /></div>;
  }

  const filteredSimilarTickers = showETFs
    ? data.similar_tickers
    : data.similar_tickers.filter(ticker => ticker.type !== 'ETF');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography variant="h4" component="h1">
        {data.ticker.name} ({data.ticker.symbol})
      </Typography>
      <FormControlLabel
        control={<Checkbox checked={showETFs} onChange={e => setShowETFs(e.target.checked)} />}
        label="Show ETFs"
        sx={{ float: 'right' }}
      />
      <TableContainer sx={{ maxHeight: '60vh', overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Symbol</TableCell>
              <TableCell>Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSimilarTickers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((ticker, index) => (
              <TableRow key={ticker.symbol}>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  <Link href={`/tickers/${ticker.symbol}`} passHref>
                    <Typography component="a" sx={{ color: 'black', textDecoration: 'none' }}>
                      {ticker.symbol}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>{ticker.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredSimilarTickers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 2 }}
      />
    </>
  );
}
