const Validator = require("validator");

module.exports = {
  validate(product) {
    const errors = [];

    if (!Validator.isString(product.name, { minLength: 10, maxLength: 80 })) {
      errors.push("Tên sản phẩm phải là chuỗi có độ dài từ 10 đến 80 ký tự");
    }

    if (!Validator.isString(product.description, { minLength: 10, maxLength: 80 })) {
      errors.push("Mô tả sản phẩm phải là chuỗi có độ dài từ 10 đến 80 ký tự");
    }

    if (!Validator.isURL(product.image)) {
      errors.push("Đường dẫn hình ảnh sản phẩm phải là URL hợp lệ");
    }

    if (!Validator.isNumeric(product.price)) {
      errors.push("Giá sản phẩm phải là số");
    }

    if (product.price < 0) {
      errors.push("Giá sản phẩm phải là số dương");
    }

    return errors;
  },
};
