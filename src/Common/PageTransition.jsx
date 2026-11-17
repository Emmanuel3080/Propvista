import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { pageVariants } from '../utils/motion';

const PageTransition = ({ children, className = "" }) => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            variants={pageVariants}
            initial={prefersReducedMotion ? false : "initial"}
            animate="animate"
            exit={prefersReducedMotion ? undefined : "exit"}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
