// User message

const express = require('express');
const Message = require('./model');

const controller = express.Router();

function sendMessage(req, res) {
    let errors = {};
    const {
        name,
        password,
        email,
        message
    } = req.body;
    const newMessage = new Message({
        ...req.body
    });
    newMessage.save((err, message) => {
        if (err) {
            errors.sending = err;
            res.status(404).json({
                errors
            });
        } else {
            const resData = {
                success: true,
            }
            res.json(resData);
        }
    })
}

controller.post('/sendMessage', sendMessage);

module.exports = controller;