import {NextFunction, Router, Request, Response} from "express";
import {Registry} from "../../registry";
import {validateJwtMiddlewareFn, validateMiddlewareFn} from "./common-middleware";
import {check, body} from 'express-validator';
import {doInDbConnection, QueryA, QueryResponse} from "../../db";
import {PoolConnection} from "mariadb";
import {View} from "../../model/view.model";
import {ApiResponse} from "../../model/response.model";


const httpAction: any[] = [
    [
        body().isArray(),
        body('*.id').exists().isNumeric(),
    ],
    validateJwtMiddlewareFn,
    validateMiddlewareFn,
    async (req: Request, res: Response, next: NextFunction) => {
        const views: View[] =  req.body;

        for (const view of views) {
            await doInDbConnection((conn: PoolConnection) => {
                conn.query(`UPDATE TBL_VIEW SET STATUS='DELETED' WHERE ID=?`,[view.id]);
            });
        }

        res.status(200).json({
           status: 'SUCCESS',
           message: `Views deleted`
        } as ApiResponse);
    }
];

const reg = (router: Router, registry: Registry) => {
    const p = `/views/delete`;
    registry.addItem('DELETE', p);
    router.delete(p, ...httpAction);
}

export default reg;