const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User.model');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async (req, res) => {
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        //Проверка пароля, пользователь есть

        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            //Генерация токена, пароли совпали
            const token = jwt.sign(
                {
                email: candidate.email,
                userId: candidate._id
                },
                keys.jwt,
                {expiresIn: 60 * 60});

            res.status(200).json({
                token: `Bearer ${token}`
            })

        } else {
            /*Пароли не совпали*/
            res.status(401).json({
                message: 'Не правильный пароль'
            })
        }

    }
    else {
        //Пользователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким email  не найден'
        })

    }
   /* res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
    })*/
};

module.exports.register = async (req, res) => {
    //email and pass
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        //Пользователь есть в БД, нужно отправить ошибку
        res.status(409).json({
            message: 'Такой email уже занят. Попробуйте другой'
        })
    } else {
        //Создать пользователя
        const solt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, solt)
        });
        try {
            await user.save();
            res.status(201).json(user);
        }
        catch (e) {
            // Обработать ошибку
            errorHandler(res, e);

        }



    }
};