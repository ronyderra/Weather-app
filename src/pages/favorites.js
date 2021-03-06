import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import getData from '../Utils/getData'

const Favorites = () => {
  const favorites = useSelector(state => state.favorites)
  const [favoritesData, setFavoritesData] = useState('')

  const getFavoriteData = () => {
    favorites.forEach(async (element) => {
      const KeyResData = await getData.currentConditions(element)
      const KeyResCityName = await getData.cityName(element)
      const temperature = KeyResData[0].Temperature.Imperial.Value
      const weatherText = KeyResData[0].WeatherText
      const name = KeyResCityName.AdministrativeArea.EnglishName
      let obj = { temperature, weatherText, name, element }
      setFavoritesData(favoritesData => [...favoritesData, obj])
    });
  }

  useEffect(() => {
    if (favorites.length > 0) {
      getFavoriteData()
    }
  }, []);

  return (
    <Container>
      <Grid >
        {favoritesData && favoritesData.map((item, i) => {
          return (
            <Grid key={i}>
              <Card sx={{ minWidth: 100 }}>
                <CardContent>
                  <Typography sx={{ fontSize: 20, color: 'black' }} color="text.secondary" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography variant="h5" component="div">
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.temperature}
                  </Typography>
                  <Typography variant="body2">
                    {item.weatherText}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )
        }
        )}
      </Grid>
    </Container>
  );
}
export default Favorites;