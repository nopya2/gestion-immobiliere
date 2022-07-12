import { createReducer, on } from '@ngrx/store';
import { Country } from '../interfaces/country.type';
import { retrievedCountryList } from './country.action';
 
export const initialState: ReadonlyArray<Country> = [];
 
const _countryReducer = createReducer(
  initialState,
  on(retrievedCountryList, (state, { allCountries }) => {
    return [...allCountries];
  })
);

export function countryReducer(state: any, action: any) {
    return _countryReducer(state, action);
  }