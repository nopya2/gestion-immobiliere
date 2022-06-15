import { createSelector } from '@ngrx/store';
import { Country } from '../interfaces/country.type';
 
import { AppState } from './app.state';
 
export const countriesSelector =(state: AppState) => state.countries;
 
export const uniqueCountryName = createSelector(
  countriesSelector,
  (countries: Country[]) => {
    return [...new Set(countries.map((_) => _.name))];
  }
);
 
export const albumCollectionByAlbumId = (name:string) => createSelector(
    countriesSelector,
    (countries:Country[]) => {
        if(name === ''){
            return countries;
        }
        return countries.filter(_ => _.name == name);
    }
)