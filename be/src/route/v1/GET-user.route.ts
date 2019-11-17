import {NextFunction, Router, Request, Response} from "express";
import {Registry} from "../../registry";
import {check} from "express-validator";
import {validateJwtMiddlewareFn, validateMiddlewareFn} from "./common-middleware";
import {i} from "../../logger";
import {getUserById} from "../../service";
import {User} from "../../model/user.model";

const httpAction: any[] = [
   [
      check('userId').exists().isNumeric()
   ],
   validateJwtMiddlewareFn,
   validateMiddlewareFn,
   async (req: Request, res: Response, next: NextFunction) => {
      const userId: number = Number(req.params.userId);
      const user: User =  await getUserById(userId);
      res.status(200).json(user);
   }
];

const reg = (router: Router, registry: Registry) => {
   const p = '/user/:userId';
   registry.addItem('GET', p);
   router.get(p, ...httpAction);
}

export default reg;