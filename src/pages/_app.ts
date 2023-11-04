import { MotionPlugin } from "@vueuse/motion";
import type { App } from "vue";

export default (app: App) => {
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
            delay: 300,
            duration: 300,
            type: "keyframes",
            ease: "easeIn",
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
            delay: 300,
            duration: 300,
            type: "keyframes",
            ease: "easeIn",
          },
        },
      },
    },
  });
};
