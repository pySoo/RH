import { DONE_REPORT, SELECT_BOOK, MAKE_QUESTION } from "./types";
import ChatService from "../service/chatService";
import ChatItem from "../service/chatItem";
import ChatbotItem from "../service/chatbotItem";

// 유저의 대답, 챗봇의 랜덤 질문을 DB에 저장
export const sendChat = (uid, message, questionList, chatId) => (dispatch) => {
  dispatch({
    type: MAKE_QUESTION,
    payload: questionList.slice(1),
  });
  localStorage.setItem("question", questionList.slice(1));
  const chatArr = [];
  chatArr.push(new ChatItem(message, "user", uid));
  // questionList: [[idx, message], ... ]
  chatArr.push(new ChatbotItem(questionList[0][1], questionList[0][0]), uid);
  return ChatService.sendChat(chatArr, chatId);
};

// 유저의 대답이 끝났을 떄 동작
export const doneChat = (chats, uid, message, chatId) => (dispatch) => {
  //dispatch(doneReport());
  const chatArr = [];
  const chatbotMsg = [
    "나눠주셔서 감사해요. 방금 대화한 내용은 제가 독후감 페이지에 기록했어요.🥰",
    "또 나눌 책이 있으신가요?",
  ];
  chatArr.push(new ChatItem(message, "user", uid));
  chatArr.push(new ChatbotItem(chatbotMsg[0], "none", uid));
  chatArr.push(new ChatItem(chatbotMsg[1], "book", uid));
  //dispatch(makeReport(chats.concat(chatArr)));
  return ChatService.sendChat(chatArr, chatId);
};

// 책 선택 후의 동작, 챗봇이 기본 메세지를 보냄
export const selectBook = (uid, name, chatId) => (dispatch) => {
  localStorage.setItem("chatId", chatId);
  // 임시로 책 선택
  localStorage.setItem("selectedBook", "개발중");
  dispatch({
    type: SELECT_BOOK,
    // 책을 선택하면 payload로 selectedBook을 설정
    payload: { book: "개발중", chatId: chatId },
  });

  // 랜덤 질문 생성
  dispatch(makeQuestion());

  // 메세지 DB 저장
  const chatArr = [];
  const messages = [`${name}님이 선택한 책은 (개발중)입니다.`, "책을 간략하게 소개해주세요🤗"];
  chatArr.push(new ChatbotItem(messages[0], "none", uid));
  chatArr.push(new ChatbotItem(messages[1], "0", uid));
  return ChatService.sendChat(chatArr, chatId);
};

// 랜덤 질문을 생성하고 localStorage에 저장
export const makeQuestion = () => (dispatch) => {
  const question = [
    [1, "가장 인상 깊었던 부분을 소개해주세요."],
    [2, "책을 읽고나서 기존의 생각이 변한 부분이 있나요?"],
    [3, "친구에게 추천해주고 싶은 책인가요? 그 이유에 대해서 말해주세요."],
    [4, "재밌었거나 흥미로웠던 장면을 설명해주세요"],
    [5, "닮고 싶은 인물이나 본받고 싶은 작가의 생각이 있었나요? 소개해주세요."],
  ];
  const questionList = question.sort(() => 0.5 - Math.random()).splice(0, 2);
  console.log(questionList);
  questionList.push([question.length + 1, "책을 한 줄로 요약한다면?"]);
  console.log(questionList);

  localStorage.setItem("question", questionList);
  dispatch({
    type: MAKE_QUESTION,
    payload: questionList,
  });
};

// 채팅 내용을 독후감으로 생성
export const makeReport = (chats, goToReport) => (dispatch) => {
  const reportArr = [];
  let report = {};
  chats = chats.slice(1, chats.length - 1);
  console.log("report", chats);
  chats.map((chat) => {
    if (chat.type === "chatbot") {
      report["title"] = chat.message;
    } else {
      report["content"] = chat.message;
      reportArr.push(report);
      report = {};
    }
  });
  console.log("report2", reportArr);
  reportArr && goToReport(reportArr);
  dispatch(doneReport());
  //ChatService.makeReport(uid, chatId);
};

// 독후감을 다 쓰거나 대화 내용을 초기화 할 때 동작
export const doneReport = () => (dispatch) => {
  dispatch({
    type: DONE_REPORT,
  });
  localStorage.removeItem("selectedBook");
  localStorage.removeItem("question");
  localStorage.removeItem("chatId");
};
