import {AttributeDataImport, DataImport} from "../../model/data-import.model";
import {readCsv} from './import-csv.service';
import {Attribute2, CsvAttribute} from "../../route/model/server-side.model";
import {Messages, Message} from "../../model/notification-listing.model";
import {Attribute, Pair1, Pair2} from "../../model/attribute.model";
import {doInDbConnection, QueryA} from "../../db";
import {PoolConnection} from "mariadb";
import {convert, revert} from "../conversion-attribute.service";

const toPair1 = (pair1: string): Pair1[] => {
    return null;
}

const toPair2 = (pair2: string): Pair2[] => {
    return null;
}

export const previewAttributeDataImport = async (viewId: number, attributeDataImportId: number,  content: Buffer): Promise<AttributeDataImport> => {

    const csvAttributes: CsvAttribute[]  = await readCsv<CsvAttribute>(content);
    const errors: Message[] = [];
    const infos: Message[] = [];
    const warnings: Message[] = [];

    const attributes: Attribute[] = csvAttributes.map((c: CsvAttribute) => ({
        id: -1,
        name: c.name,
        description: c.description,
        format: c.format,
        showCurrencyCountry: !!c.showCurrencyCountry,
        type: c.type,
        pair1: toPair1(c.pair1),
        pair2: toPair2(c.pair2)
    } as Attribute));

    const result: Attribute[] = [];

    for(const attribute of attributes) {
        const q: QueryA = await doInDbConnection(async (conn: PoolConnection) => {
            await conn.query(`
                SELECT COUNT(*) AS COUNT FROM TBL_VIEW_ATTRIBUTE WHERE NAME=?
            `, [attribute.name]);
        });
        if (q[0].COUNT > 0) {
            errors.push({
               title: `Attribute already exists`,
               messsage: `Attribute ${attribute.name} already exists`
            } as Message);
        } else {
            const attr2: Attribute2 = revert([attribute])[0];
            doInDbConnection((conn: PoolConnection) => {
                conn.query(`
                    INERT INTO TBL_DATA_IMPORT_VIEW_ATTRIBUTE (DATA_IMPORT_ITEM_ID, ATTRIBUTE_METADATA_ID
                `);
            });
            result.push(attribute);
        }
    }

    return {
        type: "ATTRIBUTE",
        attributeDataImportId,
        messages: {
           errors,
           infos,
           warnings
        } as Messages,
        attributes: result
    } as AttributeDataImport;
}