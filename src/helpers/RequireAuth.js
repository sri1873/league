import { useLocation, } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom/dist";

const RequireAuth = () => {
    const user = sessionStorage.getItem('user');
    const location = useLocation();
    return (
        (user) ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} replace />
    )
}

export default RequireAuth;
// import React, { useState, useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { isValidPhoneNumber } from "react-phone-number-input";
// import api from "../../api";
// import Modal from "../Modal/Modal";
// import "./Home.css";
// import "../../Utils/Colors.css";

// const Home = () => {
//     const [show, setShow] = useState(true);
//     const [msg, setMsg] = useState("");
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [courtValues, setcourtValues] = useState();
//     const [isCourtSelected, setIsCourtSelected] = useState(false);
//     const [availablSlots, setAvailableSlots] = useState();
//     const [bookings, setBookings] = useState([]);
//     return (
//             <Formik
//                 initialValues={{
//                     email: "",
//                     name: "",
//                     contact: "",
//                     arena: "",
//                     slot: "",
//                 }}
//                 validate={(values) => {
//                     console.log(values);
//                     const errors = {};
//                     if (!values.email) {
//                         errors.email = "Enter Woxsen email ID";
//                     } else if (
//                         !/^[A-Z0-9._%+-]+@woxsen.edu.in$/i.test(values.email)
//                     ) {
//                         errors.email = "Please enter a valid Woxsen email ID";
//                     }
//                     if (!values.name) {
//                         errors.name = "Enter your name";
//                     }
//                     if (!values.contact) {
//                         errors.contact = "Enter phone number";
//                     } else if (!isValidPhoneNumber("+91" + values.contact)) {
//                         errors.contact = "Enter valid phone number";
//                     }
//                     if (!values.arena) {
//                         errors.arena = "Select arena";
//                     }
//                     if (!values.slot) {
//                         errors.slot = "Select slot";
//                     }
//                     if (
//                         values.email &&
//                         values.name &&
//                         values.contact &&
//                         values.arena
//                     ) {
//                         setIsCourtSelected(true);
//                     }
//                     if (
//                         values.email &&
//                         values.name &&
//                         values.contact &&
//                         values.arena &&
//                         values.slot
//                     ) {
//                         setShow(false);
//                     }

//                     return errors;
//                 }}
//                 onSubmit={async (values, { setSubmitting, resetForm }) => {
//                     console.log(
//                         values.arena,
//                         values.slot,
//                         values.contact,
//                         values.email,
//                         values.name
//                     );
//                     let responce;
//                     try {
//                         responce = await api.post(`/addBooking`, {
//                             name: values.name,
//                             email: values.email,
//                             contact: values.contact,
//                             ground_id: values.arena,
//                             slot_id: values.slot,
//                         });
//                     } catch {
//                         setMsg("Something went wrong");
//                         setIsModalVisible(true);
//                     }
//                     setSubmitting(false);
//                     setIsCourtSelected(false);
//                     resetForm();
//                     if (responce.status === 200) {
//                        alert("Slot booked sucessfully");
//                     }
//                 }}
//             >
//                 {({ isSubmitting, values, setFieldValue }) => (
//                     <Form className="ui form">
//                         <label>Email</label>
//                         <Field className="field" type="email" name="email" />
//                         <ErrorMessage
//                             style={{ color: "red" }}
//                             name="email"
//                             component="div"
//                         />
//                         <br />
//                         <label>Name</label>
//                         <Field className="field" type="text" name="name" />
//                         <ErrorMessage
//                             style={{ color: "red" }}
//                             name="name"
//                             component="div"
//                         />
//                         <br />
//                         <label>Mobile Number</label>
//                         <Field className="field" type="text" name="contact" />
//                         <ErrorMessage
//                             style={{ color: "red" }}
//                             name="contact"
//                             component="div"
//                         />
//                         <br />
//                         <label>Select Areana</label>
//                         <br />
//                         <select
//                             defaultChecked
//                             className="field ui dropdown"
//                             onChange={(e) => {
//                                 console.log(e.target.value);
//                                 getAvailableSlots(e.target.value);
//                                 setFieldValue("arena", e.target.value);
//                             }}
//                             value={values.arena}
//                             name="court"
//                         >
//                             <option
//                                 className="field"
//                                 value=""
//                                 disabled={false}
//                                 defaultValue
//                                 label="Choose"
//                             />
//                             {courtValues?.map((m) => {
//                                 console.log(
//                                     ">>>>UM",
//                                     m?.under_maintainence,
//                                     Boolean(m.under_maintainence.toLowerCase())
//                                 );
//                                 return (
//                                     <option
//                                         className="field"
//                                         key={m.ground_id}
//                                         value={m.ground_id}
//                                         label={`${m.ground_name} ${m.under_maintainence.toLowerCase() === "true"
//                                                 ? "(UNDER-MAINTAINCE)"
//                                                 : ""
//                                             }`}
//                                         disabled={
//                                             m.under_maintainence.toLowerCase() === "true"
//                                                 ? true
//                                                 : false
//                                         }
//                                     />
//                                 );
//                             })}
//                         </select>
//                         <ErrorMessage
//                             style={{ color: "red" }}
//                             name="arena"
//                             component="div"
//                         />
//                         {isCourtSelected ? (
//                             <div>
//                                 <label>Select slot</label>
//                                 <select
//                                     defaultChecked
//                                     className="field ui dropdown"
//                                     onChange={(e) => {
//                                         setFieldValue("slot", e.target.value);
//                                     }}
//                                     value={values.slot}
//                                     name="court"
//                                 >
//                                     <option
//                                         className="field"
//                                         value=""
//                                         defaultValue
//                                         label={`${availablSlots?.length === 0
//                                                 ? "No slots available"
//                                                 : "Choose"
//                                             }`}
//                                     />

//                                     {availablSlots?.map((m) => {
//                                         return (
//                                             <option
//                                                 className="field"
//                                                 key={m.slot_id}
//                                                 value={m.slot_id}
//                                                 label={m.slot_time}
//                                             />
//                                         );
//                                     })}
//                                 </select>
//                                 <ErrorMessage
//                                     style={{ color: "red" }}
//                                     name="slot"
//                                     component="div"
//                                 />
//                             </div>
//                         ) : null}
//                         <br />
//                         <button disabled={show} className="ui button" type="submit">
//                             Submit
//                         </button>
//                     </Form>
//                 )}
//             </Formik>

//             );
// }