import { getNode } from "../lib/dom/getNode.js";
import { loadStorage } from "../lib/utils/storage.js";

const textLink = getNode(".text-link");

const getUserData = async () => {
  let users = await loadStorage("loginUser");
  if (!users) return false;
  return true;
};

const renderMainPage = async () => {
  let user = await getUserData();
  console.log(user);
  if (user) {
    textLink.innerHTML = "<li><span>로그아웃</span></li>";
  }
};

window.onload = renderMainPage;
