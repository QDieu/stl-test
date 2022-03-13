import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { TUser } from '../../../types/User';

type TStyle = {
  odd?: boolean;
};

const Wrapper = styled.tr<TStyle>`
  text-align: center;
  background-color: ${({ odd }) => (odd ? '#f6f6f6' : 'inherit')};
  padding-top: 10px;
  padding-left: 20px;
`;

const TextWrapper = styled.p`
  color: #252b42;
  font-weight: 500;
  font-size: 18px;
  line-height: 26px;
`;

type TProps = {
  user?: TUser;
  odd?: boolean;
};

export const UserRow: React.FC<TProps> = ({ user, odd }) => {
  const { name, country, age, id, email } = user || {};

  const fullName = name && name.split(' ');

  return (
    <Wrapper odd={odd}>
      <td>
        <TextWrapper>{id}</TextWrapper>
      </td>
      <td>{fullName && <TextWrapper>{fullName[0]}</TextWrapper>}</td>
      <td>{fullName && <TextWrapper>{fullName[1]}</TextWrapper>}</td>
      <td>
        <TextWrapper>{country}</TextWrapper>
      </td>
      <td>
        <TextWrapper>{email}</TextWrapper>
      </td>
      <td>
        <TextWrapper>{age}</TextWrapper>
      </td>
      <td>
        <Link href={`/${id}`} passHref>
          <TextWrapper>
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
              <path d="M0 13.7143L5.71428 8L0 2.28571L1.14286 0L9.14286 8L1.14286 16L0 13.7143Z" fill={'#C0C0C0'} />
            </svg>
          </TextWrapper>
        </Link>
      </td>
    </Wrapper>
  );
};
