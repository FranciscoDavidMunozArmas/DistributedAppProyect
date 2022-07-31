import { Router } from 'express';
import * as Controller from '../controller/calendar.controller';

const router = Router();

router.route("/:user")
.get(Controller.getFullCalendar)
.post(Controller.saveDate)
.delete(Controller.removeFullCalendar);

router.route("/:user/:calendar")
.put(Controller.updateCalendar)
.delete(Controller.deleteCalendar);

router.route("/:user/day")
.post(Controller.getCalendarByDay);

router.route("/:user/interval")
.post(Controller.getCalendarByDate);

export default router;