import React from "react";
import Nav from "../../components/Nav/Nav";
import { Heading } from "../../components/Heading/Heading";
import { SignUpForm } from "./SignUpForm";
import { RedirectButton } from "../../components/RedirectButton/RedirectButton";
import { Footer } from "../../components/Footer/Footer";
import styles from "./signUpPage.module.css";

export const SignUpPage = () => {
  return (
    <>
      <Nav />
      <div className={styles.body}>
        <Heading text="Sign up" />
        <SignUpForm />
        <RedirectButton text="Already" link="login" btnText="Login" />
      </div>
      <Footer />
    </>
  );
};
