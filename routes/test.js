import express from 'express';
let router = express.Router();

router.post('/', (req, res) => {
    console.log('hiiiiii');
});

export default router;