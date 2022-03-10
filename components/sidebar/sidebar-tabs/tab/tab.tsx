import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
`;

const ContentWrapper = styled.div`
  padding: 5px 15px;
  border-radius: 5px;
  margin-bottom: 10px;
  background: #4b51ef;
  &:hover {
    cursor: pointer;
  }
  display: inline-block;
`;

const TextWrapper = styled.span`
  font-size: 16px;
  line-height: 20px;
  font-family: "Roboto";
  color: #fff;
`;

type TProps = {
  item: string[];
};

export const Tab: React.FC<TProps> = ({ item }) => {
  const { asPath } = useRouter();

  const [order, setOrder] = React.useState(true);

  React.useEffect(() => {
    asPath.includes(`sort=${item[0]}`) ? setOrder(!order) : !order && setOrder(true);
  }, [asPath]);

  return (
    <Link href={`/?_sort=${item[0]}&_order=${order ? "asc" : "desc"}`}>
      <ContentWrapper>
        <TextWrapper>{item[1]}</TextWrapper>
      </ContentWrapper>
    </Link>
  );
};
