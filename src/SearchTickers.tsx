import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router'

interface TickerType {
  symbol: string;
  name: string;
  type: string;
}

async function fetchTickers(query: string): Promise<TickerType[]> {
  const response = await fetch(`https://api.tickertwins.com/tickers?q=${query}`);
  const data: TickerType[] = await response.json();
  return data;
}
  

function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => Promise<ReturnType<T>> {
    let timeout: ReturnType<typeof setTimeout> | null = null;
    return function (...args: Parameters<T>): Promise<ReturnType<T>> {
      return new Promise((resolve) => {
        if (timeout) {
          clearTimeout(timeout);
        }
        timeout = setTimeout(() => resolve(func(...args)), wait);
      });
    };
  }  

export default function SearchTicker() {
  const [value, setValue] = React.useState<TickerType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<TickerType[]>([]);
  const router = useRouter()

  const fetchTickersDebounced = React.useMemo(
    () =>
      debounce(async (query: string) => {
        return fetchTickers(query);
      }, 400),
    []
  );

  React.useEffect(() => {
    let active = true;
  
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return;
    }
  
    const fetchResults = async () => {
      const results = await fetchTickersDebounced(inputValue);
      if (active) {
        let newOptions: TickerType[] = [];
  
        if (value) {
          newOptions = [value];
        }
  
        if (results) {
          newOptions = [...newOptions, ...results];
        }
  
        setOptions(newOptions);
      }
    };
  
    fetchResults();
  
    return () => {
      active = false;
    };
  }, [value, inputValue, fetchTickersDebounced]);
  

  return (
    <Autocomplete
      id="search-ticker"
      sx={{ width: 300 }}
      getOptionLabel={(option: TickerType) => `${option.name} (${option.symbol})`}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      noOptionsText="No tickers"
      onChange={(event, newValue) => {
        if (newValue) {
          router.push(`/tickers/${newValue.symbol}`);
        }
      }}
      onInputChange={(event, newInputValue) => {
        if (event.type === 'change') {
          setInputValue(newInputValue);
        }
      }}
      renderInput={(params) => <TextField {...params} label="Search Company or Ticker" fullWidth />}
      renderOption={(props, option) => (
        <li {...props}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography variant="body1">
                {option.name} ({option.symbol})
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {option.type}
              </Typography>
            </Grid>
          </Grid>
        </li>
      )}
    />
  );
}
