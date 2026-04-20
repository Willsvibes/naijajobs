import type { Variants} from "framer-motion";

export const fadeIn: Variants = {
    hidden: {
        opacity: 0,
        x: -20
},
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: 0.2,
        },
    },
};

export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      times: [0, 0.5, 1],
    },
  },
};



export const fadeIn2: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      delay: 0.4,
    },
  },
};

import type { Transition } from "framer-motion";

export const buttonTransition: Transition = {
  duration: 0.3,
  ease: "easeInOut",
};


export const gradientMove: Variants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    opacity: [1, 0.8, 1],
    scale: [1, 1.1, 1],
    rotate: [0, 5, 0],
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};
