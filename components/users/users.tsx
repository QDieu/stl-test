import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { UserAPI } from '../../api/users-api';
import { TUser } from '../../types/User';
import { ModelView } from '../modal-view';
import { UserInfoForm } from '../user-info';
import { UserHead, UserRow } from './user-row';

const Container = styled.div`
  width: 100%;
  overflow: auto;
`;

const Button = styled.div`
  display: inline-block;
  background-color: #23a6f0;
  border: 1px solid #23a6f0;
  padding: 10px;
  border-radius: 32px;
  color: #fff;
  cursor: pointer;
  margin: 16px;

  font-size: 18px;
  line-height: 28px;

  text-align: center;

  &:hover {
    background-color: #fff;
    color: #236af0;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  & th:nth-child(1) {
    width: 5%;
  }
  & th:nth-child(2) {
    width: 10%;
  }
  & th:nth-child(3) {
    width: 13%;
  }
  & th:nth-child(4) {
    width: 30%;
  }
  & th:nth-child(5) {
    width: 25%;
  }
  & th:nth-child(6) {
    width: 5%;
  }
  & th:nth-child(7) {
    width: 12%;
  }

  & tr {
    td:nth-child(7) {
      cursor: pointer;

      &:hover {
        background-color: #e6e6fa;

        svg path {
          fill: #faf0e6;
        }
      }
    }
  }

  table,
  th,
  td {
    border: 2px solid #ededed;
  }
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

  const onAddUserForm = React.useCallback(
    async (data) => {
      let response = await UserAPI.postNewUser(data);
      if (response == 201) router.reload();
    },
    [router],
  );

  return (
    <Container>
      <ModelView active={activeModal} setActive={setActiveModal}>
        <UserInfoForm onSubmitForm={onAddUserForm} />
      </ModelView>
      <Button onClick={onOpenModal}>Добавить пользователя</Button>
      <Table>
        <thead>
          <UserHead />
        </thead>
        <tbody>
          {users.map((item, index) => (
            <UserRow user={item} key={item.id} odd={index % 2 == 0} />
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
