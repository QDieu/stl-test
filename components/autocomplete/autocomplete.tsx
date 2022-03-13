import React, { ReducerAction } from 'react';
import styled from 'styled-components';
import { countryList } from './country-list';

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
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

const List = styled.ul`
  width: 100%;
  border: 1px solid #949494;
  list-style: none;
  margin-top: 0;

  max-height: 145px;
  overflow-y: auto;

  padding: 20px 12px 20px 0;
  border-top: 0px;

  position: absolute;
  top: 60px;
  background-color: #fff;

  font-size: 16px;
  line-height: 19px;

  & li {
    padding: 0.5rem;

    &:hover {
      background-color: #008f68;
      color: #fff;
      cursor: pointer;
      font-weight: 700;
    }
  }
`;

type TProps = {
  country?: string;
};

export const Autocomplete = React.forwardRef<HTMLInputElement, TProps>(({ country }, ref) => {
  const [filteredList, setFilteredList] = React.useState(countryList);
  const [countryName, setCountryName] = React.useState(country);
  const [activeList, setActiveList] = React.useState(false);

  const rootElement = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => rootElement.current?.contains(e.target as Node) || setActiveList(false);
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  });

  const onChangeText = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setActiveList(true);
    setCountryName(e.currentTarget.value);
    setFilteredList(countryList.filter((item) => item.includes(e.currentTarget.value)));
  }, []);

  const onClickListItem = React.useCallback((item) => {
    setCountryName(item);
    setActiveList(false);
  }, []);

  return (
    <Wrapper ref={rootElement}>
      <Label htmlFor="country">Country</Label>
      <Input
        id="country"
        placeholder="Country"
        ref={ref}
        value={countryName}
        onChange={onChangeText}
        autoComplete="off"
      />
      {filteredList.length && activeList ? (
        <List>
          {filteredList.map((item) => (
            <li key={item} onClick={() => onClickListItem(item)}>
              {item}
            </li>
          ))}
        </List>
      ) : null}
    </Wrapper>
  );
});

Autocomplete.displayName = 'Autocomplete';
