import React from "react";
import { GetServerSideProps } from "next";
import styled from "styled-components";
import { Sidebar } from "../components/sidebar/sidebar";
import { Users } from "../components/users";
import { TUser } from "../types/User";
import { UserAPI } from "../api/users-api";

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await UserAPI.getUsers(context.resolvedUrl);

  return {
    props: { users: data },
  };
};

type TProps = {
  users: Array<TUser>;
};

const UserTable: React.FC<TProps> = ({ users }) => {
  return (
    <Wrapper>
      <Sidebar />
      <Users users={users} />
    </Wrapper>
  );
};

export default UserTable;
