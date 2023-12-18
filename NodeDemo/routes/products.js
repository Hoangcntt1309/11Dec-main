var express = require('express');
var router = express.Router();
var responseData = require('../helper/responseData');
var modelProduct = require('../models/product'); // Giả sử có một mô hình sản phẩm
var validate = require('../validates/product1'); // Giả sử có các hàm kiểm tra hợp lệ cho sản phẩm

const { validationResult } = require('express-validator');

router.get('/', async function (req, res, next) {
  try {
    console.log(req.query);
    var productsAll = await modelProduct.getAll(req.query);
    responseData.responseReturn(res, 200, true, productsAll);
  } catch (error) {
    responseData.responseReturn(res, 500, false, "Lỗi khi lấy danh sách sản phẩm");
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    var product = await modelProduct.getOne(req.params.id);
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "Không tìm thấy sản phẩm");
  }
});

router.post('/add', validate.validator(),
  async function (req, res, next) {
    try {
      var errors = validationResult(req);
      if (!errors.isEmpty()) {
        responseData.responseReturn(res, 400, false, errors.array().map(error => error.msg));
        return;
      }

      var existingProduct = await modelProduct.getByProductName(req.body.productName);
      if (existingProduct) {
        responseData.responseReturn(res, 404, false, "Sản phẩm đã tồn tại");
      } else {
        const newProduct = await modelProduct.createProduct({
          productName: req.body.productName,
          description: req.body.description,
          price: req.body.price,
          // Thêm các trường khác nếu cần
        });
        responseData.responseReturn(res, 200, true, newProduct);
      }
    } catch (error) {
      responseData.responseReturn(res, 500, false, "Lỗi khi thêm sản phẩm");
    }
  });

router.put('/edit/:id', async function (req, res, next) {
  try {
    var product = await modelProduct.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    responseData.responseReturn(res, 200, true, product);
  } catch (error) {
    responseData.responseReturn(res, 404, false, "Không tìm thấy sản phẩm");
  }
});

router.delete('/delete/:id', async function (req, res, next) {
  try {
    var product = await modelProduct.findByIdAndDelete(req.params.id);
    responseData.responseReturn(res, 200, true, "Xóa thành công");
  } catch (error) {
    responseData.responseReturn(res, 404, false, "Không tìm thấy sản phẩm");
  }
});

module.exports = router;
