import { Injectable } from '@angular/core';
import {
  AddProjectGQL,
  AddProjectMutationVariables,
  AllProjectsQuery,
  AllProjectsDocument,
  DeleteProjectMutationVariables,
  DeleteProjectGQL
} from '../../core/types';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(
    private addProjectGQL: AddProjectGQL,
    private deleteProjectGQL: DeleteProjectGQL
  ) {}

  addProject(variables: AddProjectMutationVariables) {
    return this.addProjectGQL.mutate(variables, {
      update: (store, { data: { createProject } }) => {
        const data: AllProjectsQuery = store.readQuery({
          query: AllProjectsDocument
        });
        data.projects.push(createProject);
        store.writeQuery({ query: AllProjectsDocument, data });
      }
    });
  }

  deleteProject(variables: DeleteProjectMutationVariables) {
    return this.deleteProjectGQL.mutate(variables, {
      update: (
        store,
        {
          data: {
            deleteProject: { id }
          }
        }
      ) => {
        const data: AllProjectsQuery = store.readQuery({
          query: AllProjectsDocument
        });
        data.projects = data.projects.filter(project => project.id !== id);
        store.writeQuery({ query: AllProjectsDocument, data });
      }
    });
  }
}
