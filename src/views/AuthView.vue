<script setup>
import { collection, onSnapshot, query } from "@firebase/firestore";
import { onMounted, onUnmounted, ref } from "vue";
import KGoogleSignin from "../components/common/k-google-signin.vue";
import firestore from "../plugins/firestore";
import { useAuthStore } from "../stores/auth";

const authStore = useAuthStore();

const users = ref([]);

function handleSignedIn(response = {}) {
  authStore.signIn({ token: response.credential });
}

function setAuth(user) {
  authStore.switch(user);
}

function isAuth(user) {
  return user.email == authStore.data.email;
}

function listenUsers() {
  onSnapshot(query(collection(firestore, "users")), (snapshot) => {
    users.value = [];
    snapshot.forEach((doc) => {
      users.value.push(doc.data());
    });
    if (users.value.length) {
      users.value.sort(
        (a, b) => b.last_login_at.toDate() - a.last_login_at.toDate()
      );
    }
  });
}

onMounted(() => {
  listenUsers();
});

onUnmounted(() => {});
</script>

<script></script>

<template>
  <div class="p-4 space-y-4">
    <div>
      <k-google-signin @signed-in="handleSignedIn" />
    </div>
    <div class="flex">
      <div class="space-y-4">
        <div
          v-for="(user, index) in users"
          :key="`user-${index}`"
          class="p-4 border rounded flex space-x-4 items-center hover:bg-gray-50 cursor-pointer"
          @click="setAuth(user)"
        >
          <img class="rounded-full w-12 h-12" :src="user.picture" />
          <div class="">
            <div class="font-bold flex space-x-2 items-center">
              <div>{{ user.name }}</div>
              <fa-icon
                v-if="isAuth(user)"
                class="text-green-600"
                icon="fa-regular fa-check-circle"
              />
            </div>
            <div class="text-sm mb-1">{{ user.email }}</div>
            <div class="text-gray-500 text-xs mb-0.5">
              Registered at {{ user.registered_at.toDate().toLocaleString() }}
            </div>
            <div class="text-gray-500 text-xs">
              Last login at
              {{ user.last_login_at.toDate().toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
