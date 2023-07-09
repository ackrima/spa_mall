const express = require('express'); // express 라이브러리를 "express" 에 할당
const router = express.Router(); // express.router() 함수를 실행하여 "router" 에 할당
const Goods = require("../schemas/goods");


router.post("/good", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price });

  res.json({ goods: createdGoods });
});

// localhost:3000/api/ GET
router.get("/", (req, res) => {
  res.send("default url for goods.js GET Method");
});

// localhost:3000/api/about GET
router.get("/about", (req, res) => {
  res.send("goods.js about PATH");
});


// 상품 조회 PAI - GET
router.get("/good", (req, res) => {
  res.json({ goods })
});

//상품 상세 조회 API
router.get("/good/:goodsId", (req, res) => {
  const { goodsId } = req.params;
  const [detail] = goods.filter((goods) => goods.goodsId === Number(goodsId));
  res.json({ detail });
});


// 장바구니 안 상품 조회 및 추가 POST
const Cart = require("../schemas/cart");
router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 장바구니에 존재하는 상품입니다."
    });
  }

  // 장바구니에 상품이 존재하지 않을 때
  await Cart.create({ goodsId: Number(goodsId), quantity: quantity });

  res.json({ result: "success" });
});


// 장바구니에 상품 수정 : POST
router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId: Number(goodsId) });
  if (existsCarts.length) {
    await Cart.updateOne(
      { goodsId: Number(goodsId) }, // 찾는 값
      { $set: { quantity } });      // 수정 값
  }

  res.status(200).json({ success: true });
})


// 장바구니에 상품 삭제 : DELETE
router.delete("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length > 0) {
    await Cart.deleteOne({ goodsId });
  }

  res.json({ result: "success" });
});

const goods = [
  {
    goodsId: 4,
    name: "상품 4",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/11/frogs-1650657_1280.jpg",
    category: "drink",
    price: 0.1,
  },
  {
    goodsId: 3,
    name: "상품 3",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/02/12/frogs-1650658_1280.jpg",
    category: "drink",
    price: 2.2,
  },
  {
    goodsId: 2,
    name: "상품 2",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2014/08/26/19/19/wine-428316_1280.jpg",
    category: "drink",
    price: 0.11,
  },
  {
    goodsId: 1,
    name: "상품 1",
    thumbnailUrl:
      "https://cdn.pixabay.com/photo/2016/09/07/19/54/wines-1652455_1280.jpg",
    category: "drink",
    price: 6.2,
  },
];

module.exports = router;


/* 라우터 기본 구조
const express = require('express'); >> express 모듈을 불러옴
const router = express.Router(); >> express 의 라우터 기능을 사용하겠다는 코드

router.METHOD(PATH, HANDLER);

- `router`: express의 라우터를 정의하기 위해 사용합니다.
- `METHOD`: HTTP Method를 나타냅니다. (ex: get, post, put, delete …)
- `PATH`: 실제 서버에서 API를 사용하기 위한 경로를 나타냅니다.
- `HANDLER`: 라우트가 일치할 때 실행되는 함수힙니다.

module.exports = router; >> 외부에서 라우터를 사용할 수 있게 해주는 코드
*/