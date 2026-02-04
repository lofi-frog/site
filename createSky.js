/**
 * createSky.js
 * 
 * Create clouds with size, position, and thickness. Move clouds with wind, setting speed and direction of movement.
 */

const Size = Object.freeze({
    XS: "xs",
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl"
});

// px values for each size
const sizeMap = {
    [Size.XS]: { px: 120, blur: 50 },
    [Size.SM]: { px: 170, blur: 70 },
    [Size.MD]: { px: 220, blur: 85 },
    [Size.LG]: { px: 280, blur: 100 },
    [Size.XL]: { px: 340, blur: 120 }
};

const Thickness = Object.freeze({
    THINNEST: "thinnest",
    THINNER: "thinner",
    THIN: "thin",
    THICK: "thick",
    THICKER: "thicker",
    THICKEST: "thickest"
});

const thicknessMap = {
    [Thickness.THINNEST]: 0.35,
    [Thickness.THINNER]: 0.46,
    [Thickness.THIN]: 0.57,
    [Thickness.THICK]: 0.68,
    [Thickness.THICKER]: 0.79,
    [Thickness.THICKEST]: 0.95
};

// speed variable converted to 0-1 scale, internally converted to vw/frame
const Speed = Object.freeze({
    CALM: 0.05,
    BREEZE: 0.1,
    LIGHT: 0.2,
    MODERATE: 0.4,
    STRONG: 0.6,
    FAST: 1.0
});


const clouds = [];

/**
 * Create a "cloud".
 * Currently, clouds resemble a mostly-circular shape that resembles a lower-altitude cloud.
 * Thickness determines whether the cloud is less or more dense, with the latter being more like a raincloud.
 * @param {Object} options
 * @param {number} options.x - horizontal position 0-100 (0 = left)
 * @param {number} options.y - vertical position 0-100 (0 = bottom)
 * @param {Size} options.size - Size.XS | SM | MD | LG | XL
 * @param {Thickness} options.thickness - Thickness.THINNEST | THINNER | THIN | THICK | THICKER | THICKEST
 */
function createCloud({ x = 50, y = 50, size = Size.MD, thickness = Thickness.THICK }) {

    // assume (x,y) = (0,0) is bottom left corner
    const cssY = 100 - y;

    const { px, blur } = sizeMap[size] || sizeMap.md;
    const opacityVal = thicknessMap[thickness] || thicknessMap.thick;

    // Convert px to vw for wrap-around calculation
    const widthInVw = (px / window.innerWidth) * 100;

    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.style.width = `${px}px`;
    cloud.style.height = `${px}px`;
    cloud.style.filter = `blur(${blur}px)`;
    cloud.style.opacity = opacityVal;
    cloud.style.transform = `translate3d(${x}vw, ${cssY}vh, 0)`;
    document.getElementById('clouds').appendChild(cloud);

    const cloudData = {
        element: cloud,
        x: x,
        y: y,
        width: widthInVw,
        height: widthInVw  // roughly square
    };
    clouds.push(cloudData);

    return cloud;
}


const wind = {
    speed: Speed.LIGHT,
    direction: 60, // degrees (clock-style: 0=up, 90=right, 180=down, 270=left)
    spacer: 10
};

// Convert 0-1 speed to vw/frame (max 0.5 vw/frame at speed=1)
function getSpeedVw() {
    return wind.speed * 0.5;
}

/**
 * Set wind speed
 * @param {number} speed - 0 to 1 (or use Speed.CALM, BREEZE, LIGHT, MODERATE, STRONG, FAST)
 */
function setWindSpeed(speed) {
    wind.speed = Math.max(0, Math.min(1, speed));
}

/**
 * Set wind direction
 * @param {number} degrees - 0=up, 90=right, 180=down, 270=left
 */
function setWindDirection(degrees) {
    wind.direction = degrees;
}

/**
 * Animation loop - moves clouds with wind
 * Direction: 0=up, 90=right, 180=down, 270=left (clock-style)
 */
function windBlows() {
    const radians = (wind.direction * Math.PI) / 180;
    const speed = getSpeedVw();
    const dx = speed * Math.sin(radians);
    const dy = speed * Math.cos(radians);

    for (const cloud of clouds) {
        // Move cloud based on wind direction
        cloud.x += dx;
        cloud.y += dy;

        // Wrap around X axis
        if (cloud.x > 100 + wind.spacer) {
            cloud.x = -cloud.width - wind.spacer;
        } else if (cloud.x < -cloud.width - wind.spacer) {
            cloud.x = 100 + wind.spacer;
        }

        // Wrap around Y axis
        if (cloud.y > 100 + wind.spacer) {
            cloud.y = -cloud.height - wind.spacer;
        } else if (cloud.y < -cloud.height - wind.spacer) {
            cloud.y = 100 + wind.spacer;
        }

        cloud.element.style.transform = `translate3d(${cloud.x}vw, ${100 - cloud.y}vh, 0)`;
    }

    requestAnimationFrame(windBlows);
}

createCloud({ x: -30, y: 30, size: Size.XL, thickness: Thickness.THICKEST });
createCloud({ x: -10, y: 55, size: Size.LG, thickness: Thickness.THICK });
createCloud({ x: 0, y: -10, size: Size.XL, thickness: Thickness.THICKEST });
createCloud({ x: 10, y: 35, size: Size.LG, thickness: Thickness.THICK });
createCloud({ x: 45, y: 25, size: Size.MD, thickness: Thickness.THICKER });
createCloud({ x: 5, y: 17, size: Size.LG, thickness: Thickness.THICKER });
createCloud({ x: 30, y: 7, size: Size.MD, thickness: Thickness.THIN });
createCloud({ x: 55, y: 60, size: Size.LG, thickness: Thickness.THICKEST });
createCloud({ x: 20, y: 40, size: Size.SM, thickness: Thickness.THINNEST });

windBlows();
