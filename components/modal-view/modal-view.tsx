import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ active: boolean }>`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ active }) => (active ? "1" : "0")};
  pointer-events: ${({ active }) => (active ? "all" : "none")};
  transition: 0.5s;
`;

const Content = styled.div<{ active: boolean }>`
  padding: 20px;
  border-radius: 15px;
  background-color: #fff;
  width: 50vw;
  transform: ${({ active }) => (active ? "scale(1)" : "scale(0.5)")};
  transition: 0.5s all;
`;

type TProps = {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

export const ModelView: React.FC<TProps> = ({ active, setActive, children }) => {
  return (
    <Wrapper onClick={() => setActive(false)} active={active}>
      <Content onClick={(e) => e.stopPropagation()} active={active}>
        {children}
      </Content>
    </Wrapper>
  );
};
