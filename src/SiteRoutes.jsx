import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "@/components/Authentication/Login/Login";
import Register from "@/components/Authentication/Register/Register";
import HomePage from "@/components/Common/HomePage";
import ScrollToTop from "@/components/Common/ScrollToTop";
import Dashboard from "@/components/Dashboard/Dashboard";
import UsersAdd from "@/components/Users/UserAdd";
import UsersDetails from "@/components/Users/UserDetails";
import UsersEdit from "@/components/Users/UserEdit";
import UsersList from "@/components/Users/UserList";
import AuthLayout from "@/containers/AuthLayout";
import NoAuthLayout from "@/containers/NoAuthLayout";
import Page404 from "@/pages/404";

const SiteRoutes = () => (
  <BrowserRouter>
    <ScrollToTop>
      <Routes>
        <Route element={<NoAuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/add" element={<UsersAdd />} />
          <Route path="/users/detail/:id" element={<UsersDetails />} />
          <Route path="/users/edit/:id" element={<UsersEdit />} />
        </Route>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </ScrollToTop>
  </BrowserRouter>
);

export default SiteRoutes;
