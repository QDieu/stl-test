import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { TUser } from "../../../types/User";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 14px;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 8px;
  background-color: #f3f3f3;
`;

const InfoRow = styled.div``;

const Description = styled.span`
  color: #a3a3a3;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
`;

const Details = styled.span`
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
  margin-left: 7px;
`;

const LeftBlock = styled.div``;

const RightBlock = styled.div`
  margin-top: auto;
`;

const Button = styled.div`
  color: #4b51ef;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;
  &:hover {
    cursor: pointer;
  }
`;

type TProps = {
  user: TUser;
};

export const UserRow: React.FC<TProps> = ({ user }) => {
  const { name, address, company, age, id } = user || {};

  const { city } = address || {};

  return (
    <Wrapper>
      <LeftBlock>
        <InfoRow>
          <Description>{`ФИО: `}</Description>
          <Details>{name}</Details>
        </InfoRow>
        <InfoRow>
          <Description>{`Город: `}</Description>
          <Details>{city}</Details>
        </InfoRow>
        <InfoRow>
          <Description>{`Компания: `}</Description>
          <Details>{company.name}</Details>
        </InfoRow>
        <InfoRow>
          <Description>{`Возвраст: `}</Description>
          <Details>{age}</Details>
        </InfoRow>
      </LeftBlock>
      <RightBlock>
        <Link href={`/${id}`}>
          <Button>Подробнее</Button>
        </Link>
      </RightBlock>
    </Wrapper>
  );
};
