import express from 'express';
import monsters from '../data/monsters.json' with {type: 'json'};

const router = express.Router();

router.get('/', function (req, res, next) {
    res.status(200).json(monsters)
});

export default router;
