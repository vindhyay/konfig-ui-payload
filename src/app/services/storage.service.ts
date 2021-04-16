import { Injectable } from '@angular/core';
import { UserDataModel } from '../modules/auth/models';
import { SelectedPreferencesModel } from '../modules/auth/models/selected-preferences.model';
import { JWT_TOKEN, PREF, USER_DATA_KEY } from '../state/constants';

// TODO change to cookies

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // Token data
  get token(): any {
    const stringData = localStorage.getItem(JWT_TOKEN);
    return stringData ? JSON.parse(stringData) : null;
  }
  set token(token: any) {
    localStorage.setItem(JWT_TOKEN, JSON.stringify(token));
  }

  // User data
  get user(): string {
    const stringData = localStorage.getItem(USER_DATA_KEY);
    return stringData ? JSON.parse(stringData) : null;
  }
  set user(user: string) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  }

  // Preference
  // User data
  get preference(): SelectedPreferencesModel {
    const stringData = sessionStorage.getItem(PREF);
    return stringData ? JSON.parse(stringData) : null;
  }
  set preference(preference: SelectedPreferencesModel) {
    sessionStorage.setItem(PREF, JSON.stringify(preference));
  }
  clearPreferences() {
    sessionStorage.removeItem(PREF);
  }

  // Clear Localstorage Keys
  clear() {
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(JWT_TOKEN);
    sessionStorage.removeItem(PREF);
  }
}
