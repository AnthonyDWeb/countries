"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useDevice() {
    const [screenSize, setDimensions] = (0, react_1.useState)({
        width: window.innerWidth,
        height: window.innerHeight,
        orientation: window.screen.orientation.type,
    });
    const width = screenSize.width;
    const height = screenSize.height;
    const isMobile = width < 764;
    const isTablet = width >= 764 && width <= 1024;
    const isDesktop = width > 1024;
    const orientation = screenSize.orientation.includes("portrait") ? "portrait" : "landscape";
    const device = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
    const deviceContextValue = {
        screenSize,
        width,
        height,
        isMobile,
        isTablet,
        isDesktop,
        orientation,
        device,
    };
    (0, react_1.useEffect)(() => {
        const handleResize = () => setDimensions({
            width: window.innerWidth,
            height: window.innerHeight,
            orientation: window.screen.orientation.type,
        });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return deviceContextValue;
}
exports.default = useDevice;
