import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import api from "../api";

export const useUserStore = defineStore("user", () => {
  const userInf = reactive({
    id: null,
    name: null,
    phone: null,
    email: null,
    verified: false,
    isLoggedIn: false,
  });

  const token = reactive({
    access: "",
    refresh: "",
  });

  function LoggedIn() {
    userInf.isLoggedIn = true;
    return userInf.isLoggedIn;
  }

  function LoggedOut() {
    userInf.isLoggedIn = false;
    token.access = null;
    token.refresh = null;
    return userInf.isLoggedIn;
  }

  function ulogin(_token) {
    userInf.isLoggedIn = true;
    token.access = _token.access;
    token.refresh = _token.refresh;

    localStorage.setItem("refresh", token.refresh);

    api
      .get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token.access}`,
        },
      })
      .then((res) => {
        userInf.id = res.data.results[0].id;
        userInf.name = res.data.results[0].name;
        userInf.email = res.data.results[0].email;
        userInf.phone = res.data.results[0].phone;
        userInf.verified = res.data.results[0].verified;

        // console.log(userInf);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }

  return { userInf, ulogin, token, LoggedIn, LoggedOut };
});
