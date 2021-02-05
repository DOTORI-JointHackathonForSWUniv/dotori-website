import React, { useEffect, useState } from "react";
import forest from "../assets/forest.png";
import user from "../assets/user.png";
import main_title from "../assets/main_title.png";
import dotori_commit from "../assets/dotori_commit.png";
import styled from "styled-components";
import Header from "./header";
import * as db from "../apis/firebase";

const Wrapper = styled.div`
  max-width: 1920px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(${forest});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center bottom;
`;
const Title = styled.img`
  width: 640px;
  height: 41px;
  margin-top: 90px;
`;
const SubTitle = styled.div`
  font-size: 17px;
  font-weight: bold;
  color: #332820;
  margin-top: 13px;
  margin-bottom: 71.5px;
`;

const ContentBox = styled.div`
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  border-top: solid 0.7px #d2d2d2;
  padding-top: 2rem;
  overflow-y: scroll;
  height: 550px;
  /* align-items: center; */
  /* justify-content: center; */
`;
const FeedBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 520px;
  margin: 1.5rem;
  align-items: center;
`;
const TitleBox = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem 0;
  width: 100%;
`;

const UserIcon = styled.img`
  width: 44px;
  height: 42px;
  padding-left: 12px;
`;
const UserName = styled.div`
  font-weight: 800;
  color: #755e4c;
  padding-left: 12px;
`;
const TitleText = styled.div`
  color: #755e4c;
  padding-left: 5px;
`;
const Day = styled.div`
  color: #6e5ae7;
  flex: 1;
  text-align: right;
  padding-right: 10px;
`;

const CodeBox = styled.div`
  width: 520px;
  height: 148px;
  border-radius: 10px;
  border: solid 2px #755e4c;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
`;
const CommitIcon = styled.img`
  width: 55px;
  height: 53.1px;
`;
const CommitMsg = styled.div`
  font-size: 21px;
  font-weight: bold;
  color: #755e4c;
  margin-top: 7px;
`;

const Main = ({ history }) => {
  let feeds = [
    { user: "다람쥐1", day: 1, commit: "commit msg1" },
    { user: "다람쥐2", day: 1, commit: "commit msg2" },
    { user: "다람쥐3", day: 1, commit: "commit msg3" },
    { user: "다람쥐4", day: 1, commit: "commit msg4" },
    { user: "다람쥐5", day: 1, commit: "commit msg5" },
  ];
  const movePage = (page) => {
    history.push(`/${page}`);
  };

  const [curAllData, setAllData] = useState([]);

  const getAllPublicFilesPushed = async () => {
    const newData = await db.getAllPublicFilesPushed();
    setAllData(newData);
  };

  useEffect(() => {
    getAllPublicFilesPushed();
  }, []);

  const curr = new Date();
  return (
    <Wrapper>
      <Header></Header>
      <Title src={main_title}></Title>
      <SubTitle>다른 친구들 도토리 주머니도 구경해봐!</SubTitle>
      {/* {curAllData.map((fileAndUser, index) => {
            return (
            <div key={index}>
              file: {fileAndUser.file.toString()}, by -{" "}
              {fileAndUser.creator.nickname}
            </div>
          );
        })} */}
      <ContentBox>
        {curAllData.map((feed) => {
          const date = feed.file.created_at.toDate();
          const timediff = curr.getTime() - date.getTime();
          const day = Math.floor(timediff / (1000 * 3600 * 24));
          const time = Math.floor(timediff / (1000 * 60 * 60));

          return (
            <FeedBox>
              <TitleBox>
                <UserIcon src={user}></UserIcon>
                <UserName>{feed.creator.nickname}</UserName>
                <TitleText>님 집에 있는 도토리 바구니</TitleText>
                <Day>{day === 0 ? `${time}시간 전` : `${day}일 전`}</Day>
              </TitleBox>
              <CodeBox>
                <CommitIcon src={dotori_commit}></CommitIcon>
                <CommitMsg>{/*feed.commit*/}</CommitMsg>
              </CodeBox>
            </FeedBox>
          );
        })}
      </ContentBox>
    </Wrapper>
  );
};

export default Main;
