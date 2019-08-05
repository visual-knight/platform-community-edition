import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Store } from '@ngxs/store';
import {
  subscribeProjects,
  AllProjectQueryResponse,
  allProjectsQuery,
  addProjectMutation,
  AddProjectQueryResponse,
  deleteProjectMutation
} from './project.graphql';
import { Project } from '../shared/models/project.model';
import { SubscriptionMutation } from '../shared/models/subscription';
import { ProjectsLoadedAction } from './state/project.actions';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projectsQuery: QueryRef<AllProjectQueryResponse>;

  constructor(private apolloService: Apollo, private store: Store) {}

  subscribeProjects() {
    this.projectsQuery = this.apolloService.watchQuery<AllProjectQueryResponse>({
      query: allProjectsQuery
    });
    this.projectsQuery.valueChanges.subscribe(({ data }) => {
      this.store.dispatch(new ProjectsLoadedAction(data.projects));
    });

    this.projectsQuery.subscribeToMore({
      document: subscribeProjects,
      updateQuery: (prev: AllProjectQueryResponse, { subscriptionData }) => {
        const subscriptionResponse: { data: any; errors?: any } = subscriptionData;
        if (subscriptionResponse.errors || !subscriptionResponse.data.project) {
          return prev;
        }
        const project: Project = subscriptionResponse.data.project.node;
        const mutation: SubscriptionMutation = subscriptionResponse.data.project.mutation;

        switch (mutation) {
          case SubscriptionMutation.CREATED:
            return Object.assign({}, prev, {
              projects: [project, ...prev.projects]
            });
          case SubscriptionMutation.UPDATED:
            return Object.assign({}, prev, {
              projects: prev.projects.map((item, index) => {
                if (item.id !== project.id) {
                  // This isn't the item we care about - keep it as-is
                  return item;
                }

                // Otherwise, this is the one we want - return an updated value
                return {
                  ...item,
                  ...project
                };
              })
            });
          case SubscriptionMutation.DELETED:
            return Object.assign({}, prev, {
              projects: prev.projects.filter(
                (item, index) => item.id !== subscriptionResponse.data.project.previousValues.id
              )
            });
        }
        return prev;
      }
    });
    return this.projectsQuery;
  }

  addProject(project: Project): Observable<Project> {
    return this.apolloService
      .mutate<AddProjectQueryResponse>({
        mutation: addProjectMutation,
        variables: {
          projectName: project.name,
          description: project.description
        }
      })
      .pipe(
        map(({ data }) => {
          return data.createProject;
        })
      );
  }

  deleteProject(project: Project): Observable<Project> {
    return this.apolloService
      .mutate({
        mutation: deleteProjectMutation,
        variables: {
          projectId: project.id,
          type: 'PROJECT'
        }
      })
      .pipe(
        map(({ data }) => {
          return data.deleteProject;
        })
      );
  }
}
