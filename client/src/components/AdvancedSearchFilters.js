const AdvancedSearchFilters = ({ onFilterChange }) => {
  const [searchHistory, setSearchHistory] = useState([]);

  const addToSearchHistory = (query) => {
    setSearchHistory(prev => {
      const newHistory = [query, ...prev.filter(q => q !== query)].slice(0, 5);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      return newHistory;
    });
  };

  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Genre</InputLabel>
            <Select
              onChange={(e) => onFilterChange('genre', e.target.value)}
            >
              <MenuItem value="">All Genres</MenuItem>
              <MenuItem value="fiction">Fiction</MenuItem>
              <MenuItem value="non-fiction">Non-Fiction</MenuItem>
              {/* Add more genres */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Availability</InputLabel>
            <Select
              onChange={(e) => onFilterChange('availability', e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="available">Available</MenuItem>
              <MenuItem value="unavailable">Unavailable</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        {/* Add more filters as needed */}
      </Grid>
    </Box>
  );
}; 