import express from 'express';
import heroes from '../data/heroes.json' with {type: 'json'};

const router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).json(heroes)
});

export default router;
