import {Registry} from "../../registry";
import {NextFunction, Request, Response, Router} from "express";
import {body, param} from "express-validator";
import {aFnAnyTrue, v, validateJwtMiddlewareFn, validateMiddlewareFn, vFnHasAnyUserRoles} from "./common-middleware";
import {ROLE_EDIT} from "../../model/role.model";
import {ApiResponse} from "../../model/api-response.model";
import {
    CustomBulkEditScriptInputValue,
    CustomBulkEditScriptJobSubmissionResult,
    CustomBulkEditScriptPreview
} from "../../model/custom-bulk-edit.model";
import {runCustomBulkEditJob} from "../../custom-bulk-edit/custom-bulk-edit-executor";


// CHECKED

const httpAction: any[] = [
    [
        param('customBulkEditId').exists().isNumeric(),
        param('viewId').exists().isNumeric(),
        body('values').isArray(),
        body('preview'),
    ],
    validateMiddlewareFn,
    validateJwtMiddlewareFn,
    v([vFnHasAnyUserRoles([ROLE_EDIT])], aFnAnyTrue),
    async (req: Request, res: Response, next: NextFunction) => {
        const customBulkEditId: number = Number(req.params.customBulkEditId);
        const viewId: number = Number(req.params.viewId);
        const values: CustomBulkEditScriptInputValue[] = req.body.values;
        const preview: CustomBulkEditScriptPreview = req.body.preview;

        const r: CustomBulkEditScriptJobSubmissionResult = await runCustomBulkEditJob(viewId, customBulkEditId, values, preview);
        res.status(200).json({
            status: 'SUCCESS',
            message: `Custom Bulk Edit script job submission done`,
            payload: r
        } as ApiResponse<CustomBulkEditScriptJobSubmissionResult>);
    }
];

const reg = (router: Router, registry: Registry) => {
    const p = `/view/:viewId/custom-bulk-edit/:customBulkEditId/submit-job`;
    registry.addItem('POST', p);
    router.post(p, ...httpAction);
};

export default reg;
