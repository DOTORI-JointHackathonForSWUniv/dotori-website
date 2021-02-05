import React from "react";
import { useState, useEffect } from "react";
import * as db from "../apis/firebase";

function FirebaseTest() {
  const [curAllData, setAllData] = useState([]);
  const [curMyPublicData, setMyPublicData] = useState([]);
  const [curMyPrivateData, setMyPrivateData] = useState([]);

  const getAllPublicFilesPushed = async () => {
    const newData = await db.getAllPublicFilesPushed();
    setAllData(newData);
  };

  const getMyPublicFilesPushed = async () => {
    const newData = await db.getMyPublicFilesPushed();
    setMyPublicData(newData);
  };

  const getMyPrivateFilesPushed = async () => {
    const newData = await db.getMyPrivateFilesPushed();
    setMyPrivateData(newData);
  };

  const changeToPublic = async () => {
    await db.changeToPublic("i3lMtwXdLzOrsBpJrqjv");
  };

  const changeToPrivate = async () => {
    await db.changeToPrivate("i3lMtwXdLzOrsBpJrqjv");
  };

  return (
    <div>
      <div>
        <button onClick={getAllPublicFilesPushed}>GET ALL FILE </button>
        <button
          onClick={() => {
            setAllData([]);
          }}
        >
          CLEAN ALL FILE
        </button>
        {curAllData.map((fileAndUser, index) => {
          return (
            <div key={index}>
              file: {fileAndUser.file.toString()}, by -{" "}
              {fileAndUser.creator.nickname}
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={getMyPublicFilesPushed}>GET MY PUBLIC FILE</button>
        <button
          onClick={() => {
            setMyPublicData([]);
          }}
        >
          CLEAN MY PUBLIC FILE
        </button>
        {curMyPublicData.map((file, index) => {
          return (
            <div key={index}>
              code: {file.code.toString()}, is_public:{" "}
              {file.is_public.toString()}
            </div>
          );
        })}
      </div>

      <div>
        <button onClick={getMyPrivateFilesPushed}>GET MY PRIVATE FILE</button>
        <button
          onClick={() => {
            setMyPrivateData([]);
          }}
        >
          CLEAN MY PRIVATE FILE
        </button>
        {curMyPrivateData.map((file, index) => {
          return (
            <div key={index}>
              code: {file.code.toString()}, is_public:{" "}
              {file.is_public.toString()}
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={changeToPublic}>CHANGE TO PUBLIC</button>
        <button onClick={changeToPrivate}>CHANGE TO PRIVATE</button>
      </div>
    </div>
  );
}

export default FirebaseTest;
