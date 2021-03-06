import {Registry} from "../../registry";
import {NextFunction, Router, Request, Response} from "express";
import {param} from 'express-validator';
import {aFnAnyTrue, v, validateJwtMiddlewareFn, validateMiddlewareFn, vFnHasAnyUserRoles} from "./common-middleware";
import {ROLE_VIEW} from "../../model/role.model";
import {Validation} from "../../model/validation.model";
import {ApiResponse} from "../../model/api-response.model";
import {getAllViewValidations} from "../../service/validation/validation.service";

// CHECKED
const httpAction: any[] = [
    [
       param('viewId').exists().isNumeric()
    ],
    validateMiddlewareFn,
    validateJwtMiddlewareFn,
    v([vFnHasAnyUserRoles([ROLE_VIEW])], aFnAnyTrue),
    async (req: Request, res: Response, next: NextFunction) => {
        const viewId: number = Number(req.params.viewId);
        const v: Validation[] = await getAllViewValidations(viewId);

        res.status(200).json({
            status: 'SUCCESS',
            message: `Validations retrieved successfully`,
            payload: v
        } as ApiResponse<Validation[]>);
    }
];

const reg = (router: Router, registry: Registry) => {
    const p = `/view/:viewId/validations`;
    registry.addItem('GET', p);
    router.get(p, ...httpAction);
}

export default reg;
