import {celebrate, Joi} from "celebrate";

import {joiOptions} from "./index";

export default {
    login: celebrate(
        {
            body: Joi.object().keys({
                email: Joi.string()
                    .required()
                    .email(),
                password: Joi.string().required(),
            }),
        },
        joiOptions,
    ),
    register: celebrate(
        {
            body: Joi.object().keys({
                email: Joi.string()
                    .required()
                    .email(),
                name: Joi.string().required(),
                password: Joi.string().required(),
            }),
        },
        joiOptions,
    ),
};