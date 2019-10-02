import { Injectable } from '@angular/core';
import {
  AllVariationsGQL,
  DeleteVariationGQL,
  AllVariationsQuery,
  AllVariationsDocument,
  GetVariationGQL
} from '../../core/types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VariationService {
  constructor(
    private allVariationsGQL: AllVariationsGQL,
    private deleteVariationGQL: DeleteVariationGQL,
    private getVariaitonGQL: GetVariationGQL
  ) {}

  variationList(testId: string) {
    return this.allVariationsGQL
      .watch({ testId })
      .valueChanges.pipe(map(result => result.data.variations));
  }

  variation(variationId: string) {
    return this.getVariaitonGQL
      .watch({ variationId })
      .valueChanges.pipe(map(({ data }) => data.variation));
  }

  delete(variationId: string) {
    return this.deleteVariationGQL
      .mutate(
        { id: variationId },
        {
          update: (
            store,
            {
              data: {
                deleteVariation: { id }
              }
            }
          ) => {
            const data: AllVariationsQuery = store.readQuery({
              query: AllVariationsDocument
            });
            data.variations = data.variations.filter(
              variation => variation.id !== variationId
            );
            store.writeQuery({ query: AllVariationsDocument, data });
          }
        }
      )
      .pipe(map(({ data }) => data.deleteVariation.id));
  }
}