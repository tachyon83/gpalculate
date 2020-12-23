import React from "react";
import { Nav } from "../../components/Nav/Nav";
import { Heading } from "../../components/Heading/Heading";
import { LoginForm } from "./LoginForm";
import { RedirectButton } from "../../components/RedirectButton/RedirectButton";
import { Footer } from "../../components/Footer/Footer";
import styles from "./loginPage.module.css";

export const LoginPage = () => {
  return (
    <>
      <Nav />
      <div className={styles.body}>
        <Heading text="Login" />
        <LoginForm />
        <RedirectButton text="Don't" link="signUp" btnText="Sign up" />
      </div>
      <Footer />
    </>
  );
};
