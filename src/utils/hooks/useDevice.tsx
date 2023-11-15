import { useState, useEffect } from "react";

export default function useDevice() {
	const [screenSize, setDimensions] = useState<{
		width: number;
		height: number;
		orientation: OrientationType;
	}>({
		width: window.innerWidth,
		height: window.innerHeight,
		orientation: window.screen.orientation.type,
	});

	const width: number = screenSize.width;
	const height: number = screenSize.height;
	const isMobile: boolean = width < 764;
	const isTablet: boolean = width >= 764 && width <= 1024;
	const isDesktop: boolean = width > 1024;
	const orientation: string = screenSize.orientation.includes("portrait") ? "portrait" : "landscape";
	const device: string = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
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

	useEffect(() => {
		const handleResize = () =>
			setDimensions({
				width: window.innerWidth,
				height: window.innerHeight,
				orientation: window.screen.orientation.type,
			});
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return deviceContextValue;
}
