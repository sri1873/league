
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  userName: string|null;
  token: string|null;
  userId: string|null;
  roles: string[];
}

interface AuthState{
    isValid: boolean,
    user: User,
    errorMsg:string
}

interface AuthActions {
  toggleActive: () => void;
  addUser: (payload: User) => void;
  setErrorMsg: (payload: string) => void;
  clearErrorMsg: () => void;
}

interface BookingDetails {
  paymentStatus: string;
  arena: string;
  bookingDate: string;
  bookingId: string;
  slot: string;
}

export { AuthState, AuthActions,User,BookingDetails };