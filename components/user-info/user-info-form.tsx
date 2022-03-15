import React from "react";
import styled from "styled-components";
import { TUser } from "../../types/User";
import { Autocomplete } from "../autocomplete";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentForm = styled.div`
  border-radius: 8px;
  border: 2px solid #f3f3f3;
  padding: 20px 12px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-size : 14px;
  line-height: 17px
  margin-bottom: 6px;
  color : #1A1A1A;
`;

const Input = styled.input`
  width: 100%;
  height: 59px;
  border-radius: 5px;
  border: 1px solid #949494;
  box-sizing: border-box;
  padding: 20px 12px;
  font-size: 16px;
  line-height: 19px;

  outline: none;

  &:focus {
    border-color: #543fd3;
  }
`;

const ButtonSubmit = styled.input`
  display: block;
  border: none;
  border-radius: 16px;
  padding: 12px 24px;
  background-color: #52cf4f;
  color: #fff;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
`;

type TProps = {
  user?: TUser;
  onSubmitForm: (data: { [key: string]: string | undefined }) => void;
};

export const UserInfoForm: React.FC<TProps> = ({ user, onSubmitForm }) => {
  const { name, country, age, email, phone, username } = user || {};

  const nameInputElement = React.useRef<HTMLInputElement>(null);
  const userNameInputElement = React.useRef<HTMLInputElement>(null);
  const ageInputElement = React.useRef<HTMLInputElement>(null);
  const emailInputElement = React.useRef<HTMLInputElement>(null);
  const countryInputElement = React.useRef<HTMLInputElement>(null);
  const phoneInputElement = React.useRef<HTMLInputElement>(null);

  const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
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
  };

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
            <Autocomplete country={country} ref={countryInputElement} />
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
