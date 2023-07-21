'use strict';

class Subscriber {
  constructor(email, rec_count = 0) {
    this.email = email;
    this.rec_count = rec_count;
  }

  recUp() {
    ++this.rec_count;
  }
}

class Coupon {
  constructor(code, rank = 'good') {
    this.code = code;
    this.rank = rank;
  }
}

const db = {
  subscribers: [
    new Subscriber('sexyuck@gmail.com'),
    new Subscriber('leeeryu@gmai.com', 2),
    new Subscriber('sam@pmail.co', 16),
    new Subscriber('jan1940@ahoy.com', 1),
  ],
  coupons: [
    new Coupon('10PERCENT', 'bad'),
    new Coupon('MAYDISCOUNT', 'good'),
    new Coupon('PROMOTION45', 'best'),
    new Coupon('GETADEAL', 'best'),
  ],

  addEmail(subscriber) {
    this.subscribers.push(new Subscriber(subscriber));
  },
};

const paginate = (array, pageSize, pageNumber) => {
  return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
};

const fetchSubscribersFromData = (page) => {
  return paginate(db.subscribers, 5, page);
};
const fetchCouponsFromData = () => db.coupons;
// ------------계산 함수들----------------
// 쿠폰 등급을 결졍하는 함수
// 어떤 구독자가 어떤 등급의 쿠폰을 받을지 결정한다.
function subCouponRank(subscriber) {
  if (subscriber.rec_count >= 10) return 'best';
  else return 'good';
}
// ------------계산 함수들----------------
// 특정 등급의 쿠폰 목록을 선택하는 함수
function selectCouponByRank(coupons, rank) {
  return coupons
    .filter((coupon) => coupon.rank === rank)
    .map((coupon) => coupon.code);
}
// ------------계산 함수들----------------
// 구독자가 받을 이메일 계획
// 구독자가 받을 이메일을 생성하는 계산 함수
function emailForSubscriber(subscriber, goods, bests) {
  const rank = subCouponRank(subscriber);

  if (rank === 'best') {
    return {
      from: 'newsletter@coupondog.co',
      to: subscriber.email,
      subject: 'Your best weekly coupons inside',
      body: `Here are the good coupons ${bests.join(', ')}`,
    };
  } else {
    return {
      from: 'newsletter@coupondog.co',
      to: subscriber.email,
      subject: 'Your good weekly coupons inside',
      body: `Here are the good coupons ${goods.join(', ')}`,
    };
  }
}
// 보낼 이메일 목록 준비하기
const emailsForSubscribers = (subscribers, goods, bests) => {
  return subscribers.map((subscriber) =>
    emailForSubscriber(subscriber, goods, bests),
  );
};
// 이메일 보내기 액션
const sendIssue = () => {
  const coupons = fetchCouponsFromData(); // 쿠폰 데이터

  const goods = selectCouponByRank(coupons, 'good'); // good 쿠폰 목록
  const bests = selectCouponByRank(coupons, 'best'); // best 쿠폰 목록
  let page = 1;
  let subscribers = fetchSubscribersFromData(page); // 구독자 데이터

  while (subscribers.length > 0) {
    const emailsToSend = emailsForSubscribers(subscribers, goods, bests); // 보낼 이메일 목록
    emailsToSend.forEach((email) => {
      console.log(email);
    });
    subscribers = fetchSubscribersFromData(++page);
  }
};

sendIssue();
