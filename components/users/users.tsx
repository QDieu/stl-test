import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { UserAPI } from "../../api/users-api";
import { TUser } from "../../types/User";
import { ModelView } from "../modal-view";
import { UserInfoForm } from "../user-info";
import { UserRow } from "./user-row";

const Container = styled.div`
  width: 100%;
  margin: 16px;
  overflow: auto;
`;

const Button = styled.div`
  display: inline-block;
  background-color: #05bb2c;
  padding: 8px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  height: 30px;
  margin-bottom: 16px;
`;

type TProps = {
  users: Array<TUser>;
};

export const Users: React.FC<TProps> = ({ users }) => {
  const [activeModal, setActiveModal] = React.useState(false);
  const router = useRouter();

  const onOpenModal = React.useCallback(() => {
    setActiveModal(true);
  }, []);

  const onAddUserForm = React.useCallback(async (data) => {
    let response = await UserAPI.postNewUser(data);
    if (response == 201) router.reload();
  }, []);

  return (
    <Container>
      <ModelView active={activeModal} setActive={setActiveModal}>
        <UserInfoForm onSubmitForm={onAddUserForm} />
      </ModelView>
      <Button onClick={onOpenModal}>Добавить пользователя</Button>
      {users.map((item) => (
        <UserRow user={item} key={item.id} />
      ))}
    </Container>
  );
};
