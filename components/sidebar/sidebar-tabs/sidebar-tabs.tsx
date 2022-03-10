import React from "react";
import styled from "styled-components";
import { Tab } from "./tab";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

type TProps = {
  itemsCategory: string[][];
};

export const SidebarTabs: React.FC<TProps> = ({ itemsCategory }) => {
  return (
    <Wrapper>
      {itemsCategory.map((item) => (
        <Tab item={item} key={item[0]} />
      ))}
    </Wrapper>
  );
};
