<script setup></script>

<template>
  <el-row>
    <el-container>
      <el-header>Header</el-header>
      <el-container>
        <el-aside :color="'red'" width="256px">Aside</el-aside>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </el-row>
</template>
