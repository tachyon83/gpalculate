import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { User } from "./User";
import { Button3 } from "../../components/Buttons/Buttons";
import styles from "./user.module.css";

function AdminUsers() {
  const history = useHistory();
  const [users, setUsers] = useState(null);
  const [searchWord, setSearchWord] = useState("");
  const [userUpdate, setUserUpdate] = useState(false);

  const jwtToken = localStorage.getItem("token");
  const authAxios = axios.create({
    headers: {
      "x-access-token": jwtToken,
    },
  });

  const fetchAllUsers = () => {
    authAxios.get("/admin/user/list").then((res) => {
      const { result, code, data } = res.data;
      if (result) {
        setUsers(data);
      } else {
        if (code === 3) {
          alert("Internal Server Error");
        } else if (code === 4) {
          history.push("/login");
        }
      }
    });
  };

  const fetchFilterUsers = () => {
    authAxios.get(`/admin/user/${searchWord}`).then((res) => {
      const { result, code, data } = res.data;
      if (result) {
        setUsers(data);
      } else {
        if (code === 3) {
          alert("Internal Server Error");
        } else if (code === 4) {
          history.push("/login");
        }
      }
    });
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (userUpdate) {
      if (searchWord === "") {
        fetchAllUsers();
      } else {
        fetchFilterUsers();
      }
    }
    setUserUpdate(false);
  }, [userUpdate]);

  const handleInputChange = (e) => {
    setSearchWord(e.target.value);
  };

  const handleSearch = () => {
    if (searchWord === "") {
      fetchAllUsers();
    } else {
      fetchFilterUsers();
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Users"
          value={searchWord}
          onChange={handleInputChange}
        />
        <Button3
          text="Search"
          onClick={handleSearch}
          cn={styles.searchButton}
        />
      </form>
      {users &&
        users.map((user) => (
          <User user={user} key={user.id} setUserUpdate={setUserUpdate} />
        ))}
      {users && users.length === 0 && <p>No users</p>}
    </>
  );
}

export default AdminUsers;
