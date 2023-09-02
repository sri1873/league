interface User {
  userName: string | null;
  token: string | null;
  userId: string | null;
  roles: string[];
}

interface AuthState {
  isValid: boolean;
  user: User;
  errorMsg: string;
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

interface Arena {
  readonly id: string;
  name: string;
  description: string;
  arenaType: string;
  status: string;
  activeIndex: boolean;
  readonly createdDate: string;
  underMaintainence: boolean;
}
interface SlotType {
  readonly id: string;
  forWomen: boolean;
  available: boolean;
  paid: boolean;
  slot: string;
  status: string;
  activeIndex: boolean;
}
// Signup.tsx

interface BranchType {
  id: string,
  name: string,
  status: string,
  activeIndex: boolean,
  readonly createdDate: string,

}
interface QuestionType {
  id: string,
  question: string,
}
interface CoursesType {

  readonly id: string,
  name: string,
  type: string,
  school: BranchType,
  status: string,
  activeIndex: boolean,
  readonly createdDate: string,

}
interface SignUpFormDetails {
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



export {
  AuthState,
  AuthActions,
  User,
  BookingDetails,
  Arena,
  SlotType,
  BranchType,
  QuestionType,
  CoursesType,
  SignUpFormDetails,
};
