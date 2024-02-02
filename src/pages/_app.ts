import { MotionPlugin } from "@vueuse/motion";
import simplebar from "simplebar-vue";
import type { App } from "vue";
import { createVfm } from "vue-final-modal";

export default (app: App) => {
  const vfm = createVfm();
  app.use(vfm);
  app.component("VueSimplebar", simplebar);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  app.use(MotionPlugin, {
    directives: {
      "slide-visible-once-left-custom": {
        initial: {
          x: -100,
          opacity: 0,
        },
        visibleOnce: {
          x: 0,
          opacity: 1,
          transition: {
            delay: 200,
            duration: 300,
            type: "keyframes",
            ease: "easeInOut",
          },
        },
      },
      "slide-visible-once-right-custom": {
        initial: {
          x: 100,
          opacity: 0,
        },
        visibleOnce: {
          x: 0,
          opacity: 1,
          transition: {
            delay: 200,
            duration: 300,
            type: "keyframes",
            ease: "easeInOut",
          },
        },
      },
      "pop-visible-once-custom": {
        initial: {
          scale: 0,
          opacity: 0,
        },
        visibleOnce: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 200,
            duration: 300,
            type: "keyframes",
            ease: "easeInOut",
          },
        },
      },
      "fade-visible-once-custom": {
        initial: {
          opacity: 0,
        },
        visibleOnce: {
          opacity: 1,
          transition: {
            delay: 200,
            duration: 300,
            type: "keyframes",
            ease: "easeInOut",
          },
        },
      },
    },
  });
};
