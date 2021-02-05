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
    .get();

  const fileAndUsers = querySnapshot.docs.map(async (doc) => {
    let data = doc.data();
    data.id = doc.id;
    const creator = await getCreatorById(data.creator);
    const fileAndUser = { file: data, creator: creator };
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
  let files = [];

  const querySnapshot = await db
    .collection("File")
    .where("creator", "==", userId)
    .where("status", "==", StatusEnum.pushed)
    .get();

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    files.push(data);
  });

  return files;
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
