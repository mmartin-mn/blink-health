import styled from "styled-components";

export const SearchInput = styled.input`
  border-radius: 4px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  font-size: 16px;
  background-color: white;
  padding: 12px 20px;
  border: 1px solid black;
  border-right: none;
  height: 44px;
`;

export const SearchButton = styled.button`
  background-color: #2196f3;
  color: white;
  border-radius: 4px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border: 1px solid black;
  height: 44px;
  width: 44px;
  cursor: pointer;
`;

export const SearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const FlexContainer = styled.div`
  display: flex;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ListItem = styled.a`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid black;
  padding: 10px 15px;
  margin-bottom: 5px;
  &:first-child {
    margin-top: 10px;
  }
  &:last-child {
    margin-bottom: 0px;
  }
  &:hover {
    background-color: lightgrey;
  }
`;

export const PageContainer = styled.div`
  max-width: 750px;
  margin: auto;
  margin-top: 50px;
`;
