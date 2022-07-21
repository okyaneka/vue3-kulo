<script setup>
import { computed, onMounted, ref } from "vue";
import realdb from "../plugins/realdb";
import { onValue, ref as fRef, set } from "firebase/database";
import { start as initGOauth } from "@/plugins/g-oauth";

const pointer = ref();
const editing = ref(false);
const graphicObjects = ref([]);
const garbageObjects = ref([]);
const loc = ref([]);
const stage = ref();
const stageWrapper = ref();
const gAuth = ref(null);
const configKonva = computed(() => ({
  stage: stageWrapper.value,
  width: 1000,
  height: 1000,
}));

function handleStartPainting(e) {
  if (!e.evt) return;
  set(fRef(realdb, "event"), JSON.parse(JSON.stringify(e)));
  editing.value = true;

  const pos = stage.value.getStage().getPointerPosition();
  console.log("add line");
  graphicObjects.value.push({
    type: "line",
    config: {
      stroke: "#df4b26",
      strokeWidth: 5,
      globalCompositeOperation: "source-over",
      lineCap: "round",
      points: [pos.x, pos.y, pos.x, pos.y],
    },
  });
}

function listenKeyDown(e) {
  if (e.code == "KeyZ" && e.ctrlKey) {
    if (e.shiftKey) {
      if (garbageObjects.value.length) {
        graphicObjects.value.push(garbageObjects.value.pop());
      }
    } else {
      if (graphicObjects.value.length) {
        garbageObjects.value.push(graphicObjects.value.pop());
      }
    }
  }
  set(fRef(realdb, "lines"), graphicObjects.value);
}

function handleStopPainting() {
  editing.value = false;
  set(fRef(realdb, "lines"), graphicObjects.value);
  // newObject.value.points = [];
}

function handlePainting() {
  const pos = stage.value.getStage().getPointerPosition();
  // set(fRef(realdb, "thedata"), {
  //   userAgeng: navigator.userAgent,
  //   x: pos.x,
  //   y: pos.y,
  if (!editing.value) return;
  const lastLine = graphicObjects.value.at(-1);
  lastLine.config.points = [...lastLine.config.points, pos.x, pos.y];
}

function handleMouseMove(e) {
  // const loc = { x: e.layerX, y: e.layerY };

  // set(fRef(realdb, "thedata"), loc);

  pointer.value.style.top = e.layerY + "px";
  pointer.value.style.left = e.layerX + "px";
}

function handleMouseEnter(e) {
  pointer.value.classList.remove("hidden");
  pointer.value.classList.add("inline-block");
}

function handleMouseLeave(e) {
  pointer.value.classList.remove("inline-block");
  pointer.value.classList.add("hidden");
}

function handleDragStart(e) {
  console.log(e);
  editing.value = true;
}

function handleDragEnd(e) {
  console.log(e);
  editing.value = false;
}

function handleAuth(e) {}

onMounted(() => {
  onValue(fRef(realdb, "lines"), (snapshot) => {
    const data = snapshot.val();
    loc.value = data;
  });

  initGOauth();

  // fGet(fChild(realdb, `lines`)).then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //   } else {
  //     console.log("No data available");
  //   }
  // });
  //   .catch((error) => {
  //     console.error(error);
  //   });

  onValue(
    fRef(realdb, "lines"),
    (snapshot) => {
      if (snapshot.exists()) {
        graphicObjects.value = snapshot.val();
      }
    },
    { onlyOnce: true }
  );
});
</script>

<template>
  <div class="mb-4"></div>

  <div class="p-4 flex gap-4">
    <div class="w-1/4 bg-red-300 p-4">
      <table class="min-w-full text-center bg-white">
        <thead class="border-b">
          <tr>
            <th scope="col" class="text-sm font-medium text-gray-900 p-2">
              type
            </th>
            <th scope="col" class="text-sm font-medium text-gray-900 p-2">
              config
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(i, idx) in loc"
            class="border-b hover:bg-gray-50"
            :key="idx"
          >
            <td class="text-sm text-gray-900 font-medium p-2 whitespace-nowrap">
              {{ i.type }}
            </td>
            <td
              class="text-sm text-gray-900 font-medium p-2 whitespace-nowrap"
              :title="JSON.stringify(i.config)"
            >
              {{ i.config.points.length }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      ref="stageWrapper"
      class="border w-3/4 rounded bg-slate-400 p-4 relative"
    >
      <v-stage
        ref="stage"
        class="bg-white cursor-crosshair"
        :config="configKonva"
        @mousedown="handleStartPainting"
        @mousemove="handlePainting"
        @mouseup="handleStopPainting"
        @touchstart="handleStartPainting"
        @touchmove="handlePainting"
        @touchend="handleStopPainting"
        @keydown="listenKeyDown"
        tabindex="0"
      >
        <v-layer>
          <v-line
            v-for="(obj, i) in graphicObjects.filter((v) => v.type == 'line')"
            :key="i"
            :config="obj.config"
          />
        </v-layer>
      </v-stage>
      <div
        ref="pointer"
        id="pointer"
        class="absolute text-5xl font-extralight -translate-x-1/2 -translate-y-1/2 hidden h-1 w-1 rounded-full bg-black"
      ></div>
    </div>
    <div v-show="false" class="w-2/3">
      <div class="w-full relative h-96 border rounded cursor-none">
        <div
          ref="area"
          draggable
          @mousemove="handleMouseMove"
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          @mousedown="handleDragStart"
          @mouseup="handleDragEnd"
          class="absolute w-full h-full top-0 left-0 z-10"
        ></div>
      </div>
    </div>
  </div>
</template>
