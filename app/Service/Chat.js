import HttpClient from '@Utils/HttpClient';

async function sendMessage(data) {
  let endpoint = 'user/message';
  return HttpClient.post(endpoint, data);
}

async function getSingleChat(id) {
  let endpoint = 'user/message/' + id;
  return HttpClient.get(endpoint);
}

async function getChatList() {
  let endpoint = 'user/message';
  return HttpClient.get(endpoint);
}

export default {
  sendMessage,
  getSingleChat,
  getChatList,
};
