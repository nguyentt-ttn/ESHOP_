import Joi from "joi";

export const productValidate = Joi.object({
  title: Joi.string().trim().min(4).required().messages({
    "any.required": "title là trường bắt buộc",
    "string.empty": "title không được để trống",
    "string.min": "title ít nhất 4 ký tự",
    "string.trim": "title không được có khoảng cách",
  }),
  image: Joi.string().trim().required().messages({
    "any.required": "image là trường bắt buộc",
    "string.empty": "image không được để trống",
    "string.trim": "image không được có khoảng cách",
  }),
  description: Joi.string().trim().required().messages({
    "any.required": "description là trường bắt buộc",
    "string.empty": "description không được để trống",
    "string.trim": "description không được có khoảng cách",
  }),
  price: Joi.number().min(0).required().messages({
    "any.required": "Price là trường bắt buộc",
    "number.min": "Price phai >0 không được âm",
    "number.base": "Price phai la số",
  }),
});
