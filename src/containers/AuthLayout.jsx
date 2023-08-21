import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import Footer from "@/components/Common/Footer";
import Header from "@/components/Common/Header";
import { checkLogin } from "@/modules/authentication";

const AuthLayout = () => {
  let navigate = useNavigate();

  useEffect(() => {
    if (!checkLogin()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Header></Header>
      <Container>
        <div className="mt-4 mb-4">
          <Outlet />
        </div>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default AuthLayout;
