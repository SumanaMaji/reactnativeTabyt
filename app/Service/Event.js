import HttpClient from '@Utils/HttpClient';

async function getAllEvent() {
  let endpoint = 'user/event';
  return HttpClient.get(endpoint);
}

async function getSingleEvent(id) {
  let endpoint = 'user/event/' + id;
  return HttpClient.get(endpoint);
}

async function applyPromoCode(data) {
  let endpoint = 'user/event/promocode';
  return HttpClient.post(endpoint, data);
}

async function eventBooking(data) {
  let endpoint = 'user/event/booking';
  return HttpClient.post(endpoint, data);
}

async function myEvent() {
  let endpoint = 'user/event/booking';
  return HttpClient.get(endpoint);
}

async function adPaymentMethod(data) {
  let endpoint = 'user/payment-method';
  return HttpClient.post(endpoint, data);
}

async function getPaymentMethod() {
  let endpoint = 'user/payment-method';
  return HttpClient.get(endpoint);
}

async function setDefaultPayment(id) {
  let endpoint = 'user/payment-method/' + id;
  return HttpClient.put(endpoint);
}

async function deletePaymentMethod(id) {
  let endpoint = 'user/payment-method/' + id;
  return HttpClient.del(endpoint);
}

async function sendInvitation(data) {
  let endpoint = 'user/invite';
  return HttpClient.post(endpoint, data);
}

async function inviteSplitUser(data) {
  let endpoint = 'user/event/split-user';
  return HttpClient.post(endpoint, data);
}

async function updateEvent(id, data) {
  let endpoint = 'user/event/booking/' + id;
  return HttpClient.put(endpoint, data);
}

async function getSingleBookingEvent(id) {
  let endpoint = 'user/event/booking/' + id;
  return HttpClient.get(endpoint);
}

async function getReview(id) {
  let endpoint = 'user/reviews/' + id;
  return HttpClient.get(endpoint);
}

async function addReview(data) {
  let endpoint = 'user/reviews';
  return HttpClient.post(endpoint, data);
}

async function updateReview(id, data) {
  let endpoint = 'user/reviews/' + id;
  return HttpClient.put(endpoint, data);
}

async function getEventUser(eId) {
  let endpoint = 'user/event/user/' + eId;
  return HttpClient.get(endpoint);
}

async function getEventMyUser(eId) {
  let endpoint = 'user/event/own-user/' + eId;
  return HttpClient.get(endpoint);
}

async function getUserProfile(uId) {
  let endpoint = 'user/profile/' + uId;
  return HttpClient.get(endpoint);
}

async function followUser(data) {
  let endpoint = 'user/follow';
  return HttpClient.post(endpoint, data);
}

async function getFollowRequest() {
  let endpoint = 'user/follow/request';
  return HttpClient.get(endpoint);
}

async function getFollower() {
  let endpoint = 'user/followers';
  return HttpClient.get(endpoint);
}

async function getFollowing() {
  let endpoint = 'user/following';
  return HttpClient.get(endpoint);
}

async function responseFollowRequest(id, data) {
  let endpoint = 'user/follow/' + id;
  return HttpClient.put(endpoint, data);
}

async function getHelp() {
  let endpoint = 'admin/get-help';
  return HttpClient.get(endpoint);
}

async function cancelBooking(data) {
  let endpoint = 'user/event/booking-cancel';
  return HttpClient.post(endpoint, data);
}

async function submitContactUs(data) {
  let endpoint = 'user/contact-us';
  return HttpClient.post(endpoint, data);
}

async function getDistingState() {
  let endpoint = 'user/event/disting-state';
  return HttpClient.get(endpoint);
}

async function deleteSplitUser(id) {
  let endpoint = `user/event/split-user/${id}`;
  return HttpClient.del(endpoint);
}

async function getSplitUser(id) {
  let endpoint = `user/event/split-user/${id}`;
  return HttpClient.get(endpoint);
}

async function approveSplitBill(id, data) {
  let endpoint = `user/event/split-user/${id}`;
  return HttpClient.put(endpoint, data);
}

async function payNow(data) {
  let endpoint = 'user/payment-now';
  return HttpClient.post(endpoint, data);
}

async function paySplitNow(data) {
  let endpoint = 'user/payment-split';
  return HttpClient.post(endpoint, data);
}

async function updateCard(id) {
  let endpoint = 'user/payment-method/' + id;
  return HttpClient.put(endpoint);
}

export default {
  getAllEvent,
  getSingleEvent,
  applyPromoCode,
  eventBooking,
  myEvent,
  adPaymentMethod,
  getPaymentMethod,
  setDefaultPayment,
  deletePaymentMethod,
  sendInvitation,
  inviteSplitUser,
  updateEvent,
  getSingleBookingEvent,
  getReview,
  addReview,
  updateReview,
  getEventUser,
  getEventMyUser,
  getUserProfile,
  followUser,
  getFollowRequest,
  getFollower,
  getFollowing,
  responseFollowRequest,
  getHelp,
  cancelBooking,
  submitContactUs,
  getDistingState,
  deleteSplitUser,
  getSplitUser,
  approveSplitBill,
  payNow,
  paySplitNow,
  updateCard,
};
