import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.tr`
  width: 100%;
`;

const TextWrapper = styled.p`
  color: #252b42;
  font-weight: 800;
  font-size: 24px;
  line-height: 48px;
`;

export const UserHead: React.FC<{}> = () => {
  return (
    <Wrapper>
      <th>
        <TextWrapper>{'#'}</TextWrapper>
      </th>
      <th>
        <TextWrapper>{'Name'}</TextWrapper>
      </th>
      <th>
        <TextWrapper>{'Last Name'}</TextWrapper>
      </th>
      <th>
        <TextWrapper>{'Position'}</TextWrapper>
      </th>
      <th>
        <TextWrapper>{'Email'}</TextWrapper>
      </th>
      <th>
        <TextWrapper>{'Age'}</TextWrapper>
      </th>
      <th></th>
    </Wrapper>
  );
};
