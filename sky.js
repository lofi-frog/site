const Diameter = Object.freeze({
    XS: "xs",
    SM: "sm",
    MD: "md",
    LG: "lg",
    XL: "xl"
});

const Thickness = Object.freeze({
    THINNEST: "thinnest",
    THINNER: "thinner",
    THIN: "thin",
    THICK: "thick",
    THICKER: "thicker",
    THICKEST: "thickest"
});

/**
 * Create a cloud
 * @param {Object} options
 * @param {number} options.x - horizontal position 0-100 (0 = left)
 * @param {number} options.y - vertical position 0-100 (0 = bottom)
 * @param {Diameter} options.diameter - Diameter.XS | SM | MD | LG | XL
 * @param {Thickness} options.thickness - Thickness.THINNEST | THINNER | THIN | THICK | THICKER | THICKEST
 */
function createCloud({ x = 50, y = 50, diameter = Diameter.MD, thickness = Thickness.THICK }) {
    // size & blur in px
    const sizes = {
        [Diameter.XS]: { size: 120, blur: 50 },
        [Diameter.SM]: { size: 170, blur: 70 },
        [Diameter.MD]: { size: 220, blur: 85 },
        [Diameter.LG]: { size: 280, blur: 100 },
        [Diameter.XL]: { size: 340, blur: 120 }
    };

    const thicknesses = {
        [Thickness.THINNEST]: 0.35,
        [Thickness.THINNER]: 0.46,
        [Thickness.THIN]: 0.57,
        [Thickness.THICK]: 0.68,
        [Thickness.THICKER]: 0.79,
        [Thickness.THICKEST]: 0.95
    };

    // assume (x,y) = (0,0) is bottom left corner
    const cssY = 100 - y;

    const { size, blur } = sizes[diameter] || sizes.md;
    const opacityVal = thicknesses[thickness] || thicknesses.thick;

    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.style.setProperty('--x', `${x}vw`);
    cloud.style.setProperty('--y', `${cssY}vh`);
    cloud.style.setProperty('--size', `${size}px`);
    cloud.style.setProperty('--blur', `${blur}px`);
    cloud.style.setProperty('--opacity', opacityVal);
    document.getElementById('clouds').appendChild(cloud);
    return cloud;
}

createCloud({ x: -10, y: 55, diameter: Diameter.LG, thickness: Thickness.THICK });
createCloud({ x: 0, y: -10, diameter: Diameter.XL, thickness: Thickness.THICKEST });
createCloud({ x: 10, y: 35, diameter: Diameter.LG, thickness: Thickness.THICK });
createCloud({ x: 45, y: 25, diameter: Diameter.MD, thickness: Thickness.THICKER });
createCloud({ x: 5, y: 17, diameter: Diameter.LG, thickness: Thickness.THICKER });
createCloud({ x: 30, y: 7, diameter: Diameter.MD, thickness: Thickness.THIN });
createCloud({ x: 55, y: 60, diameter: Diameter.LG, thickness: Thickness.THICKEST });
createCloud({ x: 20, y: 40, diameter: Diameter.SM, thickness: Thickness.THINNEST });
