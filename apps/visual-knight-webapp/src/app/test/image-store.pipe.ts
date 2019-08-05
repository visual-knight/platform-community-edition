import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { get } from 'lodash-es';
@Pipe({
  name: 'imageStore'
})
export class ImageStorePipe implements PipeTransform {
  constructor(private store: Store) {}

  transform(value: any): any {
    // return 'https://s3.eu-central-1.amazonaws.com/';
    const contractId = this.store.selectSnapshot(state => {
      return get(state, 'auth.user.contractUser.id');
    });

    if (contractId && value) {
      return `https://s3.eu-central-1.amazonaws.com/${contractId}/${value}`;
    } else {
      return '';
    }
  }
}
