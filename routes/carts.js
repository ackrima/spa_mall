const express = require("express");
const router = express.Router();
const Cart = require("../schemas/cart.js");
const Goods = require("../schemas/goods.js");

// 장바구니 조회 API
router.get("/carts", async (req, res) => {
    const carts = await Cart.find({});
    //Cart 에서 모든 data 를 찾아서 "carts" 에 넣어준다. 이 때 동기(await) 처리를 하여 다른 코드의 진행을 막아준다.
    const goodsIds = carts.map((cart) => cart.goodsId);

    const goods = await Goods.find({ goodsId: goodsIds });
    // Goods에 해당하는 모든 정보를 가지고 오되, "goodsIds" 안에 존재하는 값일 때만 조회하라.
    
    const results = carts.map((cart) => {
        return {
            "quantity": cart.quantity,
            "goods": goods.find((item) => item.goodsId === cart.goodsId)
        };
    });

    res.json({
        "carts": results,
    });
});


module.exports = router;