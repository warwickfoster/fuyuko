import {itemValueConvert, itemValueRevert} from "../../src/service/conversion-item-value.service";
import {ItemMetadata2, ItemMetadataEntry2, ItemValue2} from "../../src/server-side-model/server-side.model";
import {StringValue, Value} from "../../src/model/item.model";


describe('conversion-item-value.service.ts', () => {
   it ('itemValueConvert', () => {
      const i: Value = itemValueConvert({
        id: -1,
        attributeId: 1,
        metadatas: [
            { id: -1, name: 'metadata', attributeId: 1, attributeType: 'string', entries: [
                { id: -1, key: 'type', value: 'string' , dataType: 'string'} as ItemMetadataEntry2,
                { id: -1, key: 'value', value: 'test' , dataType: 'string'} as ItemMetadataEntry2,
            ]} as ItemMetadata2
        ]
      } as ItemValue2);

      expect(i.attributeId).toBe(1);
      expect((i.val as StringValue).type).toBe('string');
      expect((i.val as StringValue).value).toBe('test');
   });


   it ('itemValueRevert', () => {
       const i: ItemValue2 = itemValueRevert({
          attributeId: 1,
          val: {
             type: 'string', value: 'test'
          } as StringValue
       } as Value);

       expect(i.attributeId).toBe(1);
       expect(i.metadatas.length).toBe(1);
       expect(i.metadatas[0].attributeId).toBe(1);
       expect(i.metadatas[0].attributeType).toBe('string');
       expect(i.metadatas[0].entries.length).toBe(2);
       expect(i.metadatas[0].entries[0].key).toBe('type');
       expect(i.metadatas[0].entries[0].value).toBe('string');
       expect(i.metadatas[0].entries[0].dataType).toBe('string');
       expect(i.metadatas[0].entries[1].key).toBe('value');
       expect(i.metadatas[0].entries[1].value).toBe('test');
       expect(i.metadatas[0].entries[1].dataType).toBe('string');
   });
});