import React from "react";
import styled from "styled-components";

import Card from "./Card";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 4vh;
  margin-bottom: 10vh;
`;


const Title = styled.h1`
  font-size: 3vw;
  text-align: center;
  color: #fff1e6;
`;

const Bookmark = ({ bookmarks }) => {
  return (
    <Wrapper>
      {bookmarks.length ? (
        bookmarks.map((bookmark) => (
            <Card key={bookmark._id} post={bookmark} bookmarkPage={true} />
        ))
      ) : (
        <Title>You have not bookmarked anything</Title>
      )}
    </Wrapper>
  );
};

export default Bookmark;
