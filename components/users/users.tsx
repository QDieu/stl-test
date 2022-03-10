import React from "react";
import styled from "styled-components";
import { TUser } from "../../types/User";
import { UserRow } from "./user-row";

const Container = styled.div`
  width: 100%;

  overflow: auto;
`;

type TProps = {
  users: Array<TUser>;
};

export const Users: React.FC<TProps> = ({ users }) => {
  return (
    <Container>
      {users.map((item) => (
        <UserRow user={item} key={item.id} />
      ))}
    </Container>
  );
};
