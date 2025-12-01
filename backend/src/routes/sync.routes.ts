import { Router } from 'express';
import { EpdkService } from '../services/epdk.service';

const router = Router();
const epdkService = new EpdkService();

router.post('/epdk', async (req, res) => {
    try {
        const result = await epdkService.syncDealers();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Sync failed', details: error });
    }
});

export default router;
