<template>
  <br>
  <gy-title>事件</gy-title>
  <GyTable :tableHeader="eventTableHeader" :tableData="eventTable"/>
</template>

<script setup lang="ts">
import {eventTableHeader, eventTable} from "@/components/propsSjmapTableData";
</script>
