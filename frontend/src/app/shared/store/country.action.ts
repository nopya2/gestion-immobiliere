import { createAction, props } from '@ngrx/store';
import { Country } from '../interfaces/country.type';
 
export const retrievedCountryList = createAction(
    "[Country API] Country API Success",
    props<{allCountries:Country[]}>()
);