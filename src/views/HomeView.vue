<script setup>
import { ref } from "vue";
import KGoogleSignin from "../components/common/k-google-signin.vue";
const form = ref({});

function handleSignUp() {}
</script>

<template>
  <div class="mx-auto p-4 w-full md:w-2/3 flex flex-col">
    <div class="flex flex-wrap flex-row-reverse border border-primary-default">
      <div class="w-full md:w-7/12 p-4 bg-primary-default">
        {{ form }}
      </div>
      <div class="w-full md:w-5/12 p-4 space-y-4">
        <div class="font-bold text-center text-2xl text-primary-default">
          {{ $t("chitchat.welcome") }}
          <span class="whitespace-nowrap">クロオオキ</span>
        </div>
        <div class="space-y-1">
          <div class="text-center">
            <KGoogleSignin />
          </div>
          <div class="text-center">atau</div>
          <form class="block space-y-4" @submit.prevent="handleSignUp">
            <k-textfield
              v-model="form.fullname"
              :placeholder="$t('form.fullname')"
            />
            <k-textfield
              v-model="form.email"
              type="email"
              :placeholder="$t('form.email')"
            />
            <k-textfield
              type="password"
              v-model="form.password"
              :placeholder="$t('form.password')"
            />
            <k-textfield
              v-model="form.password_confirmation"
              type="password"
              :placeholder="$t('form.password_confirmation')"
            />
            <k-button class="block w-full" text="Daftar" type="submit" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
