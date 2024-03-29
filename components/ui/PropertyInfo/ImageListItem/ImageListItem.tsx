import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  display: flex;
  align-items: center;
  img {
    width: 45px; // height: 30px;
  }
  span {
    color: black;
    margin-left: 30px;
    font-weight: bold;
    font-size: 90%;
  }
`;

function ImageListItem({ text }) {
  return (
    <ItemContainer>
      <span>{text}</span>
    </ItemContainer>
  );
}

export default ImageListItem;
