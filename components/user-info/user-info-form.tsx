import { ParsedUrlQuery } from "querystring";
import React from "react";
import styled from "styled-components";
import { UserAPI } from "../../api/users-api";
import { TUser } from "../../types/User";

type TStyle = {
  isError?: boolean;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentForm = styled.div`
  border-radius: 8px;
  border: 2px solid #f3f3f3;
  margin-bottom: 10px;
  padding: 20px 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  margin-bottom: 3px;
`;

const Input = styled.input<TStyle>`
  width: 40%;
  border-radius: 5px;
  border: 2px solid;
  border-color: ${({ isError }) => (isError ? "#D91313" : "#d8d8d8")};
  box-sizing: border-box;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 14px;
`;

const ButtonSubmit = styled.input`
  display: block;
  border: none;
  border-radius: 5px;
  padding: 8px;
  background-color: #52cf4f;
  color: #fff;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
`;

type TProps = {
  user?: TUser;
  onSubmitForm: (data: { [key: string]: string | undefined }) => void;
};

export const UserInfoForm: React.FC<TProps> = ({ user, onSubmitForm }) => {
  const { name, country, age, id = 1, email, phone, username } = user || {};

  const nameInputElement = React.useRef<HTMLInputElement>(null);
  const userNameInputElement = React.useRef<HTMLInputElement>(null);
  const ageInputElement = React.useRef<HTMLInputElement>(null);
  const emailInputElement = React.useRef<HTMLInputElement>(null);
  const countryInputElement = React.useRef<HTMLInputElement>(null);
  const phoneInputElement = React.useRef<HTMLInputElement>(null);

  const formHandler = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name: nameInputElement.current?.value,
      username: userNameInputElement.current?.value,
      age: ageInputElement.current?.value,
      email: emailInputElement.current?.value,
      country: countryInputElement.current?.value,
      phone: phoneInputElement.current?.value,
    };
    onSubmitForm(data);
  }, []);

  return (
    <Wrapper>
      <form onSubmit={formHandler}>
        <ContentForm>
          <InputWrapper>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Name" ref={nameInputElement} type="text" defaultValue={name} />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Username"
              ref={userNameInputElement}
              type="text"
              defaultValue={username}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="age">Age</Label>
            <Input id="age" placeholder="Age" ref={ageInputElement} type="number" defaultValue={age} />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" placeholder="E-mail" ref={emailInputElement} type="email" defaultValue={email} />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="country">Country</Label>
            <Input id="country" placeholder="Country" ref={countryInputElement} type="text" defaultValue={country} />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="Phone" ref={phoneInputElement} type="phone" defaultValue={phone} />
          </InputWrapper>
          <ButtonSubmit type="submit" value="Добавить" />
        </ContentForm>
      </form>
    </Wrapper>
  );
};
