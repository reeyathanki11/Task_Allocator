import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./components/signin/Signin";
import Home from "./components/home/Home";
import { useSelector, useDispatch } from "react-redux";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { useEffect } from "react";
import { getClassList } from "./redux/actions/classRoomActions";
import ClassDetailedView from "./components/classDetailedView/ClassDetailedView";
import ClassPrivateRoute from "./components/classDetailedView/ClassPrivateRoute";
import AdminHome from "./components/adminHome/AdminHome";
import AdminClassView from "./components/adminClassView/AdminClassView";
import { ErrorBoundary } from "./components/errorBoundry/ErrorBoundry";
import DetailedNotification from "./components/detailedNotification/DetailedNotification";
import AdminEditForm from "./components/adminEditForm/AdminEditForm";
import CreateUser from "./components/createUser/CreateUser";
import EditForm from "./components/editForm/EditForm";
import './App.css';
import CreateClass from "./components/createClass/CreateClass";
import DrawerAppBar from "./components/navbar/Navigation";
import UsersListTable from "./components/usersList/UsersListTable";
import ClassInfo from "./components/ClassInfo/ClassInfo";
import Contact from "./components/contact/Contact";

function App() {
  const state = useSelector(state => state.authDataReducer)
  const allState = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getClassList())
  }, []);

  return (
    <>
      <ErrorBoundary>
        <BrowserRouter>
          {state.isAuthenticated && <DrawerAppBar state={state} />}
          <Routes>
            <Route path="/" element={<PrivateRoute classlist={allState.classListReducer} auth={!state.isAuthenticated} admin={!state.isAdmin} toLink={!state.isAdmin ? "/home" : "/adminhome"} />}>
              <Route path="/" element={<Signin />} />
            </Route>
            <Route path="/" element={<PrivateRoute classlist={allState.classListReducer} auth={state.isAuthenticated} admin={!state.isAdmin} toLink="/" />}>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<ClassPrivateRoute isAdmin={false} />}>
                <Route path="/class/:id/:bgindex" element={<ClassDetailedView />} />
                <Route path="/class/:id/:cid/:bgindex" element={<DetailedNotification isAdmin={false} />} />
                <Route path="/class/:id/:bgindex/users" element={<UsersListTable isAdmin={false} />} />
                <Route path="/class/:id/:bgindex/details" element={<ClassInfo isAdmin={false} />} />
              </Route>
            </Route>
            <Route path="/" element={<PrivateRoute classlist={allState.classListReducer} auth={state.isAuthenticated} admin={state.isAdmin} toLink="/" />}>
              <Route path="/adminhome" element={<AdminHome />} />
              <Route path="/" element={<ClassPrivateRoute isAdmin={true} />}>
                <Route path="/adminclass/:id/:bgindex" element={<AdminClassView />} />
                <Route path="/adminclass/:id/:cid/:bgindex" element={<DetailedNotification isAdmin={true} />} />
                <Route path="/adminclass/:id/:nid/edit/:bgindex" element={<EditForm />} />
                <Route path="/adminclass/:id/add/:bgindex" element={<AdminEditForm />} />
                <Route path="/adminclass/:id/:bgindex/users" element={<UsersListTable isAdmin={true} />} />
                <Route path="/adminclass/:id/:bgindex/details" element={<ClassInfo isAdmin={true} />} />
              </Route>
              <Route path="/createuser" element={<CreateUser />} />
              <Route path="/createclass" element={<CreateClass />} />
            </Route>
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/about-us" element={<div>about us</div>} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;
