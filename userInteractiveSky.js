document.getElementById('speedInput').addEventListener('input', (e) => {
    setWindSpeed(parseFloat(e.target.value));
});

document.getElementById('directionInput').addEventListener('input', (e) => {
    setWindDirection(parseFloat(e.target.value));
});

document.getElementById('addCloudButton').addEventListener('click', () => {
    const sizes = [Size.XS, Size.SM, Size.MD, Size.LG, Size.XL];
    const thicknesses = [Thickness.THINNEST, Thickness.THINNER, Thickness.THIN, Thickness.THICK, Thickness.THICKER, Thickness.THICKEST];
    createCloud({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: sizes[Math.floor(Math.random() * sizes.length)],
        thickness: thicknesses[Math.floor(Math.random() * thicknesses.length)]
    });
});
