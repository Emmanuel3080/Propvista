import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Automatically resets scroll position to the top (scrollY = 0)
 * whenever the route pathname or search query changes.
 */
const ScrollToTop = () => {
    const { pathname, search } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, [pathname, search]);

    return null;
};

export default ScrollToTop;
