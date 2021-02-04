import React, { useEffect } from "react";
import loginImg from "../assets/loginImg.png";
import logo from "../assets/logo.png";
import styled from "styled-components";

const Wrapper = styled.div`
    max-width: 1920px;
    height: 100%;
    display: flex;
    flex-direction: row;
`;

const LoginImg = styled.img`
    width: 57%;
`;

const LoginSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto 0;
`;
const LogoImg = styled.img`
    width: 40%;
`;

const LoginBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    margin-top: 5rem;
`;
const InputBox = styled.div`
    width: 100%;
`;
const InputName = styled.div`
    font-size: 18px;
    font-weight: bold;
    color: #332820;
`;
const Input = styled.input`
    padding: 0;
    height: 53px;
    width: 94%;
    padding-left: 5%;
    background-color: #ffffff;
    margin: 1rem 0;
    border: solid 1px #755e4c;
    font-size: 18px;
`;
const LoginButton = styled.button`
    border: none;
    border-radius: 5px;
    width: 100%;
    background-color: #755e4c;
    color: white;
    height: 63px;
    margin-top: 0.5rem;
    padding: 0;
    font-size: 20px;
    font-weight: bold;
`;
const AuthBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 1rem;
`;
const Sign = styled.div`
    flex: 1;
    font-size: 15px;
    color: #755e4c;
    text-align: left;
    text-decoration: underline;
`;
const Pwd = styled.div`
    flex: 1;
    font-size: 15px;
    color: #755e4c;
    text-align: right;
    text-decoration: underline;
`;

const Login = ({ history }) => {
    const moveMain = () => {
        history.push("/");
    };

    return (
        <Wrapper>
            <LoginImg src={loginImg}></LoginImg>
            <LoginSection>
                <LogoImg src={logo}></LogoImg>
                <LoginBox>
                    <InputBox>
                        <InputName>아이디</InputName>
                        <Input></Input>
                    </InputBox>
                    <InputBox>
                        <InputName>비밀번호</InputName>
                        <Input></Input>
                    </InputBox>
                    <LoginButton>로그인하기</LoginButton>
                    <AuthBox>
                        <Sign>회원가입</Sign>
                        <Pwd>비밀번호 찾기</Pwd>
                    </AuthBox>
                </LoginBox>
            </LoginSection>
        </Wrapper>
    );
};

export default Login;
