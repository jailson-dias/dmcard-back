const express = require("express");
const router = express.Router();
const requestCreditCardController = require("../controllers/requestCreditCard.controller");

// routes
router.post("/", create);
router.get("/accepted", getAccepted);
router.get("/refused", getRefused);
router.get("/", getAll);
router.delete("/:id", _delete);

module.exports = router;

function create(req, res, next) {
  requestCreditCardController
    .create(req.body)
    .then(request => {
      res.json(request);
    })
    .catch(err => next(err));
}

function getAll(req, res, next) {
  requestCreditCardController
    .getAll()
    .then(requests => res.json(requests))
    .catch(err => next(err));
}

function getAccepted(req, res, next) {
  requestCreditCardController
    .getAccepted()
    .then(requests => res.json(requests))
    .catch(err => next(err));
}

function getRefused(req, res, next) {
  requestCreditCardController
    .getRefused()
    .then(requests => res.json(requests))
    .catch(err => next(err));
}

function _delete(req, res, next) {
  requestCreditCardController
    .delete(req.params.id)
    .then(request => res.json(request))
    .catch(err => next(err));
}
