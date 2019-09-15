import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [],
  providers: [],
  imports: [CommonModule, GraphQLModule],
  exports: [GraphQLModule]
})
export class CoreModule {}
