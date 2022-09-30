import React, { useContext, useEffect, useState } from "react";
import styled, { ThemeContext } from "styled-components";

import Input from "Components/input";

import { convertRGB, convertHEXA, validateHEX } from "Utils/colors";

const Wrapper = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10vh;

  width: 100%;
  padding: 2rem 0.5rem;
`;

const ColorConverter = ({ setMainBackground }) => {
  const themeContext = useContext(ThemeContext);
  const initialBackground = themeContext.mainCanvas;
  const [rgbValue, setrgbValue] = useState(convertHEXA(initialBackground));
  const [hexaValue, sethexaValue] = useState(initialBackground);

  useEffect(() => {
    if (!validateHEX(hexaValue)) {
      return;
    }

    const timeout = setTimeout(() => {
      setMainBackground(hexaValue);
    }, 200);
    return () => clearTimeout(timeout);
  }, [hexaValue]);

  const onChangeRGBA = (e) => {
    setrgbValue(e.target.value);
    const hex = convertRGB(e.target.value);
    if (hex) {
      navigator.clipboard.writeText(hex.substring(1).toLowerCase());
      sethexaValue(hex);
    }
  };
  const onChangeHEXA = (e) => {
    sethexaValue(e.target.value);
    const rgbaString = convertHEXA(e.target.value);
    if (rgbaString) {
      setrgbValue(rgbaString);
    }
  };

  const copy = () =>
    navigator.clipboard.writeText(hexaValue.substring(1).toLowerCase());

  return (
    <Wrapper background={hexaValue}>
      <Input label="RGBA" value={rgbValue} onChange={onChangeRGBA} />
      <span>TO</span>
      <Input
        label="HEXA"
        value={hexaValue.toLowerCase()}
        onChange={onChangeHEXA}
      />
      <button onClick={copy}>Copy</button>
    </Wrapper>
  );
};

export default ColorConverter;
