import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import { UserAPI } from "../api/users-api";
import { UserInfoForm } from "../components/user-info";
import { TUser } from "../types/User";

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data: Array<TUser> = await UserAPI.getUsers("");

  const paths = data.map(({ id }) => ({
    params: { id: id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as IParams;
  const data = await UserAPI.getUserInfo(id);
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
  const router = useRouter();

  const onUpdateUserForm = React.useCallback(async (data) => {
    await UserAPI.patchUserInfo(user.id.toString(), data);
    router.push("/");
  }, []);

  return <UserInfoForm user={user} onSubmitForm={onUpdateUserForm} />;
};

export default User;
