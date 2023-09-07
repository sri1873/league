export interface User {
  userName: string | null;
  token: string | null;
  userId: string | null;
  roles: string[];
}

export interface AuthState {
  isValid: boolean;
  user: User;
  errorMsg: string;
}

export interface AuthActions {
  toggleActive: () => void;
  addUser: (payload: User) => void;
  setErrorMsg: (payload: string) => void;
  clearErrorMsg: () => void;
}

export interface BookingDetails {
  
  extendable:boolean
  extended:null|string,
  paymentStatus: string|null;
  arena: string;
  bookingDate: string;
  bookingId: string;
  slot: string;
}

export interface Arena {
  readonly id: string;
  name: string;
  description: string;
  arenaType: string;
  status: string;
  activeIndex: boolean;
  readonly createdDate: string;
  underMaintainence: boolean;
}
export interface SlotType {
  readonly id: string;
  forWomen: boolean;
  available: boolean;
  paid: boolean;
  slot: string;
  status: string;
  activeIndex: boolean;
}
// Signup.tsx

export interface BranchType {
  id: string,
  name: string,
  status: string,
  activeIndex: boolean,
  readonly createdDate: string,

}
export interface QuestionType {
  id: string,
  question: string,
}
export interface CoursesType {

  readonly id: string,
  name: string,
  type: string,
  school: BranchType,
  status: string,
  activeIndex: boolean,
  readonly createdDate: string,

}
export interface SignUpFormDetails {
  gender:string,
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string,
  courseId: string
}

// ADMIN MODULE
export interface BookingByUser{
  arena: string,
  bookingDate: Date,
  // timeslot: formatTimeSlot(entry.slot),
  bookingId: string,
  userPhone: string,
  userSchool: string,
  extendable: boolean
  extended: null | string,
  paymentStatus: string | null;
  slot: string;
}


