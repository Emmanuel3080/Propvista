// Shared subtle-luxury Framer Motion variants & transitions (200–600ms)
export const LUXURY_EASE = [0.22, 1, 0.36, 1];

export const pageVariants = {
    initial: {
        opacity: 0,
        y: 10,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.38,
            ease: LUXURY_EASE,
        },
    },
    exit: {
        opacity: 0,
        y: -6,
        transition: {
            duration: 0.22,
            ease: LUXURY_EASE,
        },
    },
};

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.04) => ({
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren,
            delayChildren,
        },
    },
});

export const fadeUpItem = (distance = 14, duration = 0.45) => ({
    hidden: {
        opacity: 0,
        y: distance,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration,
            ease: LUXURY_EASE,
        },
    },
});

export const cardScrollVariants = {
    hidden: {
        opacity: 0,
        y: 16,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.44,
            ease: LUXURY_EASE,
        },
    },
};

export const modalOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.24, ease: LUXURY_EASE },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2, ease: LUXURY_EASE },
    },
};

export const modalPanelVariants = {
    hidden: {
        opacity: 0,
        scale: 0.96,
        y: 12,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.28,
            ease: LUXURY_EASE,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.97,
        y: 8,
        transition: {
            duration: 0.2,
            ease: LUXURY_EASE,
        },
    },
};
