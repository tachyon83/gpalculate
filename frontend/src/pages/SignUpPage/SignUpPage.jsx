import React from "react";
import { Nav } from "../../components/Nav/Nav";
import { Heading } from "../../components/Heading/Heading";
import { SignUpForm } from "./SignUpForm";
import { Redirect } from "../../components/Redirect/Redirect";
import { Footer } from "../../components/Footer/Footer";
import styles from "./signUpPage.module.css";

export const SignUpPage = () => {
  return (
    <>
      <Nav />
      <div className={styles.body}>
        <Heading text="Sign up" />
        <SignUpForm />
        <Redirect text="Already" link="login" btnText="Login" />
      </div>
      <Footer />
    </>
  );
};
