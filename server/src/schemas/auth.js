import Joi from "joi";

export const registerSchema = Joi.object({
    username: Joi.string().min(3).trim().required().messages({
        "any.required":"Username là trường bắt buộc",
        "string.empty":"Username không được để trống",
        "string.min":"Username tối thiểu 3 ký tự",
        "string.trim":"Username không được có khoảng cách",
    }),
    email: Joi.string().trim().email().required().messages({
        "any.required":"Email là trường bắt buộc",
        "string.empty":"Email không được để trống",
        "string.email":"Email không hợp lệ",
        "string.trim":"Email không được có khoảng cách",
    }),
    password: Joi.string().min(6).trim().required().messages({
        "any.required":"Password là trường bắt buộc",
        "string.empty":"Password không được để trống",
        "string.min":"Password tối thiểu 6 ký tự",
        "string.trim":"Password không được có khoảng cách",
    }),
    role: Joi.string().trim().messages({
        "string.empty":"Role không được là trường bắt buộc",
        "string.trim":"Role không được có khoảng cách",
    }),
    // confirmPassword: Joi.string().min(6).trim().required().valid(Joi.ref("password")).messages({
    //     "any.required":"ConfirmPassword là trường bắt buộc",
    //     "any.only":"ConfirmPassword phải trùng với password",
    //     "string.empty":"ConfirmPassword không được để trống",
    //     "string.min":"ConfirmPassword tối thiểu 6 ký tự",
    //     "string.trim":"ConfirmPassword không được có khoảng cách",
    // }),
})
export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required().messages({
        "any.required":"Email là trường bắt buộc",
        "string.empty":"Email không được để trống",
        "string.email":"Email không hợp lệ",
        "string.trim":"Email không được có khoảng cách",
    }),
    password: Joi.string().min(6).trim().required().messages({
        "any.required":"Password là trường bắt buộc",
        "string.empty":"Password không được để trống",
        "string.min":"Password tối thiểu 6 ký tự",
        "string.trim":"Password không được có khoảng cách",
    })
})