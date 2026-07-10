// Shared motion variants — one interaction vocabulary across all pages.
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const tapPress = {
  whileTap: { scale: 0.98 },
  transition: { duration: 0.2, ease: easeOut },
};

export const hoverShift = {
  whileHover: { x: 8 },
  whileTap: { scale: 0.99 },
  transition: { duration: 0.3, ease: easeOut },
};

export const chipPress = {
  whileHover: { y: -1 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.15, ease: easeOut },
};

export const cardPress = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.985 },
  transition: { duration: 0.25, ease: easeOut },
};
