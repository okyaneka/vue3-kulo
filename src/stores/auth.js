import { defineStore } from "pinia";
import db from "../plugins/firestore";
import { decodeJwt } from "jose";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";

const collectionName = "users";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    data: null,
    token: null,
  }),
  getters: {
    getData: (state) => state.data,
    getToken: (state) => state.token,
  },
  actions: {
    async signValidate({token}) {

    },
    async signIn({ token }) {
      const data = decodeJwt(token);
      console.log(data);
      const userData = {
        email: data.email,
        name: data.name,
        picture: data.picture,
        given_name: data.given_name,
        family_name: data.family_name,
      };
      const querySnapshot = await getDocs(
        query(
          collection(db, collectionName),
          where("email", "==", userData.email)
        )
      );

      if (!querySnapshot.empty) {
        const user = querySnapshot.docs.find(
          (v) => v.data().email == userData.email
        );
        userData.login_history = [
          user.data().last_login_at,
          ...user.data().login_history,
        ];
        userData.last_login_at = Timestamp.fromDate(new Date());

        await setDoc(doc(db, collectionName, user.id), {
          ...user.data(),
          ...userData,
        });
        this.data = {
          $id: user.id,
          ...user.data(),
          ...userData,
        };
      } else {
        userData.login_history = [];
        userData.last_login_at = Timestamp.fromDate(new Date());
        userData.registered_at = Timestamp.fromDate(new Date());

        const docRef = await addDoc(collection(db, collectionName), userData);
        this.data = { $id: docRef.id, ...userData };
      }

      this.token = token;
      return userData;
    },

  },
});
