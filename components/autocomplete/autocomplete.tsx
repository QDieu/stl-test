import React, { ReducerAction } from 'react';
import styled from 'styled-components';
import { countryList } from './country-list';

const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 3px;
`;

const Input = styled.input<{ isError?: boolean }>`
  width: 40%;
  border-radius: 5px;
  border: 2px solid;
  border-color: ${({ isError }) => (isError ? '#D91313' : '#d8d8d8')};
  box-sizing: border-box;
  padding: 5px 10px;
  font-size: 12px;
  line-height: 14px;
`;

const List = styled.ul`
  width: 40%;
  border: 2px solid #d8d8d8;
  border-top-width: 0;
  list-style: none;
  margin-top: 0;

  max-height: 145px;
  overflow-y: auto;

  padding-left: 0;

  position: absolute;
  top: 49px;
  background-color: #fff;

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
    <Wrapper>
      <Label htmlFor="country">Country</Label>
      <Input
        id="country"
        placeholder="Country"
        ref={ref}
        value={countryName}
        onChange={onChangeText}
        autoComplete="off"
      />
      {filteredList.length && activeList && (
        <List>
          {filteredList.map((item) => (
            <li key={item} onClick={() => onClickListItem(item)}>
              {item}
            </li>
          ))}
        </List>
      )}
    </Wrapper>
  );
});

Autocomplete.displayName = 'Autocomplete';
