import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  padding: 5px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  background: #4b51ef;
  cursor: pointer;
  display: inline-block;

  border: 1px solid #4b51ef;

  &:hover {
    background-color: #fff;

    span {
      color: #4b51ef;
    }
  }
`;

const TextWrapper = styled.span`
  font-size: 18px;
  line-height: 24px;
  font-family: 'Roboto';
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
  }, [asPath, item, order]);

  return (
    <Link href={`/?_sort=${item[0]}&_order=${order ? 'asc' : 'desc'}`} passHref>
      <ContentWrapper>
        <TextWrapper>{item[1]}</TextWrapper>
      </ContentWrapper>
    </Link>
  );
};
