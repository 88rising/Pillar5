"use strict";
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/userModel');
var passport = require('passport');
var user = new User();
router.post('/register', function (req, res, next) {
    user.email = req.body.email;
    var setPassword = user.setPassword(req.body.password);
    user.passwordHash = req.body.password;
    user.passwordHash = setPassword.passwordHash;
    user.salt = setPassword.salt;
    user.save(function (err, user) {
        if (err)
            return next(err);
        res.send("Registration Complete. Please login.");
    });
});
router.get('/userProfile', function (req, res, next) {
    User.find({ email: '123' }).then(function (user) {
        res.json(user);
    });
});
router.post('/login', function (req, res, next) {
    if (!req.body.email || !req.body.password)
        res.status(400).send("Please fill out every field");
});
module.exports = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlclJvdXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlclJvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQzlCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNuQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQTtBQUN6QyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFbkMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUd0QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQzVCLElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3RDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQztJQUM3QyxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDN0IsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFTLEdBQUcsRUFBRSxJQUFJO1FBQ3hCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekIsR0FBRyxDQUFDLElBQUksQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFHSCxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxVQUFTLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsSUFBSTtRQUNsQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pCLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFHSCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSTtJQUNuQyxFQUFFLENBQUEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDekMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUN0RCxDQUFDLENBQUMsQ0FBQTtBQUdGLGlCQUFTLE1BQU0sQ0FBQyJ9