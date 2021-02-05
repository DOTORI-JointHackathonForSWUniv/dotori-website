import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import logout from "../assets/logout.png";
import user from "../assets/user.png";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Wrapper = styled.div`
    height: 144.5px;
    width: 100%;
    border-bottom: solid 0.7px #d2d2d2;
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const LogoImg = styled.img`
    width: 189px;
    height: 106px;
    padding-left: 35px;
`;
const UserBox = styled.div`
    flex: 1;
    padding-top: 17px;
`;
const Logout = styled.img`
    float: right;
    width: 55px;
    height: 53.1px;
    padding-right: 30px;
`;
const User = styled.img`
    float: right;
    width: 55px;
    height: 53.1px;
    padding-right: 35px;
`;

const Header = ({ history }) => {
    const movePage = (page) => {
        history.push(`/${page}`);
    };

    return (
        <Wrapper>
            <LogoImg src={logo}></LogoImg>
            <UserBox>
                <User src={user} onClick={() => movePage("user")}></User>
                <Logout src={logout}></Logout>
            </UserBox>
        </Wrapper>
    );
};

export default withRouter(Header);
