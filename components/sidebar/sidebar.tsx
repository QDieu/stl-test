import React from 'react';
import styled from 'styled-components';
import { SidebarTabs } from './sidebar-tabs';

const Wrapper = styled.div`
  width: 220px;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 16px;
`;

const TextWrapper = styled.div`
  margin-bottom: 10px;
  font-size: 24px;
`;

const Top = styled.div``;

type TProps = {};

export const Sidebar: React.FC<TProps> = () => {
  const itemsCategory = [
    ['country', 'по стране'],
    ['email', 'по почте'],
    ['name', 'по имени'],
    ['age', 'по возрасту'],
  ];

  return (
    <Wrapper>
      <Top>
        <TextWrapper>Сортировка</TextWrapper>
        <SidebarTabs itemsCategory={itemsCategory} />
      </Top>
    </Wrapper>
  );
};
