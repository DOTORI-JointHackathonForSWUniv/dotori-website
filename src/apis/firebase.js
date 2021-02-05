import db from "../config/firebase.js";
import firebase from "firebase";

const StatusEnum = {
  added: 0,
  commited: 1,
  pushed: 2,
};
Object.freeze(StatusEnum);

const userId = "MkiBUPyIhdgOefgKg82a";

export const getAllPublicFilesPushed = async () => {
  const querySnapshot = await db
    .collection("File")
    .where("status", "==", StatusEnum.pushed)
    .where("is_public", "==", true)
    .orderBy("created_at", "desc")
    .get();

  const fileAndUsers = querySnapshot.docs.map(async (doc) => {
    let data = doc.data();
    const fileId = doc.id;
    data.id = fileId;
    const creator = await getCreatorById(data.creator);
    const message = await getCommitMessageByFileId(fileId);
    const fileAndUser = { file: data, creator: creator, commitMsg: message };
    return fileAndUser;
  });

  const result = Promise.all(fileAndUsers);

  return result;
};

const getCreatorById = async (id) => {
  const querySnapshot = await db.collection("User").doc(id).get();
  const user = (await querySnapshot.ref.get()).data();
  return user;
};

export const getMyAllFilesPushed = async () => {
  const querySnapshot = await db
    .collection("File")
    .where("creator", "==", userId)
    .where("status", "==", StatusEnum.pushed)
    .orderBy("created_at", "desc")
    .get();

  const fileAndCommitName = querySnapshot.docs.map(async (doc) => {
    let data = doc.data();
    const fileId = doc.id;
    data.id = fileId;
    const message = await getCommitMessageByFileId(fileId);
    const fileAndCommitMsg = { file: data, commitMsg: message };
    return fileAndCommitMsg;
  });

  const result = Promise.all(fileAndCommitName);

  return result;
};

export const getMyPublicFilesPushed = async () => {
  let files = [];

  const querySnapshot = await db
    .collection("File")
    .where("creator", "==", userId)
    .where("is_public", "==", true)
    .where("status", "==", StatusEnum.pushed)
    .get();

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    files.push(data);
  });

  return files;
};

export const getMyPrivateFilesPushed = async () => {
  let files = [];

  const querySnapshot = await db
    .collection("File")
    .where("creator", "==", userId)
    .where("is_public", "==", false)
    .where("status", "==", StatusEnum.pushed)
    .get();

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    files.push(data);
  });

  return files;
};

export const changeToPublic = async (fileId) => {
  const querySnapshot = await db.collection("File").doc(fileId).get();
  const fileRef = querySnapshot.ref;

  await fileRef.update({ is_public: true });
};

export const changeToPrivate = async (fileId) => {
  const querySnapshot = await db.collection("File").doc(fileId).get();
  const fileRef = querySnapshot.ref;

  await fileRef.update({ is_public: false });
};

const getCommitMessageByFileId = async (fileId) => {
  const querySnapshot = await db
    .collection("Commit")
    .where("files", "array-contains", fileId)
    .limit(1)
    .get();

  let message = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const name = data.name;
    message = name;
  });

  return message;
};
