import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import styled from "styled-components";
import { TUser } from "../types/User";

type TStyle = {
  isError?: boolean;
};

interface IParams extends ParsedUrlQuery {
  id: string;
}

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
  padding: 5px 6px 5px 15px;
  background-color: #52cf4f;
  color: #fff;
  font-size: 14px;
  line-height: 16px;
  cursor: pointer;
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Array<TUser> = await (await fetch("http://localhost:3004/users")).json();

  const paths = data.map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  console.log(context.params);
  const { id } = context.params as IParams;
  const data = await (await fetch(`http://localhost:3004/users/${id}`)).json();
  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { user: data },
  };
};

type TProps = {
  user: TUser;
};

const User: React.FC<TProps> = ({ user }) => {
  const { name, username, address, phone, website, email } = user || {};
  const { zipcode, street, city } = address || {};

  const nameInputElement = React.useRef<HTMLInputElement>(null);
  const userNameInputElement = React.useRef<HTMLInputElement>(null);
  const emailInputElement = React.useRef<HTMLInputElement>(null);
  const cityInputElement = React.useRef<HTMLInputElement>(null);
  const streetInputElement = React.useRef<HTMLInputElement>(null);
  const zipcodeInputElement = React.useRef<HTMLInputElement>(null);
  const phoneInputElement = React.useRef<HTMLInputElement>(null);
  const websiteInputElement = React.useRef<HTMLInputElement>(null);

  const formHandler = React.useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      name: nameInputElement.current?.value,
      username: userNameInputElement.current?.value,
      email: emailInputElement.current?.value,
      city: cityInputElement.current?.value,
      street: streetInputElement.current?.value,
      zipcode: zipcodeInputElement.current?.value,
      phone: phoneInputElement.current?.value,
      website: websiteInputElement.current?.value,
    };

    console.log(data);
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
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" placeholder="E-mail" ref={emailInputElement} type="email" defaultValue={email} />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="City" ref={cityInputElement} type="text" defaultValue={city} />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="street">Street</Label>
            <Input id="street" placeholder="Street" ref={cityInputElement} type="text" defaultValue={street} />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="zipcode">Zip-code</Label>
            <Input id="zipcode" placeholder="Zip-code" ref={zipcodeInputElement} type="text" defaultValue={zipcode} />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" placeholder="Phone" ref={phoneInputElement} type="phone" defaultValue={phone} />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="website">Website</Label>
            <Input id="website" placeholder="Website" ref={websiteInputElement} type="text" defaultValue={website} />
          </InputWrapper>
          <ButtonSubmit type="submit" value="Добавить" />
        </ContentForm>
      </form>
    </Wrapper>
  );
};

export default User;
