import * as Styled from '../../styles/Reflections.styled';

function interpolateColor(value, minColor, midColor, maxColor) {
  if (value <= 5) {
    const factor = (value - 1) / 4; // scale 1-5
    return interpolate(minColor, midColor, factor);
  } else {
    const factor = (value - 5) / 5; // scale 5-10
    return interpolate(midColor, maxColor, factor);
  }
}

function interpolate(color1, color2, factor) {
  const result = color1.slice();
  for (let i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }
  return result;
}

function rgbToHex(rgb) {
  return (
    '#' +
    rgb
      .map((val) => {
        const hex = val.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

function GradientBar({ emotion, productivity }) {
  const red = [255, 0, 0];
  const yellow = [255, 255, 0];
  const green = [0, 255, 0];

  const emotionColor = interpolateColor(emotion, red, yellow, green);
  const productivityColor = interpolateColor(productivity, red, yellow, green);

  const emotionColorHex = rgbToHex(emotionColor);
  const productivityColorHex = rgbToHex(productivityColor);

  const gradientStyle = {
    background: `linear-gradient(to right, ${emotionColorHex}, ${productivityColorHex})`,
  };

  return <Styled.GradientBar style={gradientStyle}></Styled.GradientBar>;
}

export default GradientBar;
