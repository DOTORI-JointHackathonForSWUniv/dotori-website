import React from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function Loading() {
  return (
    <Center>
      <ReactLoading type="bubbles" color="#755e4c" height={100} width={100} />
    </Center>
  );
}

export default Loading;
