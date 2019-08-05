import { State, StateContext, NgxsOnInit, Action, Selector } from '@ngxs/store';
import { ProjectStateModel } from './project.state.model';
import { ProjectsLoadedAction, ProjectSubscribeAction, ProjectAddAction, ProjectDeleteAction } from './project.actions';
import { ProjectService } from '../project.service';
import { Hexcolor } from '../../shared/helpers/hexcolor';
import { Project } from '../../shared/models/project.model';
import { find, merge, cloneDeep, remove } from 'lodash-es';
import { PriceState } from '../../shared/modules/pricing/store/price.state';
import { PriceStateModel } from '../../shared/modules/pricing/store/price.state.model';
import { Product } from '../../shared/models/product.model';
import { AuthState } from '../../shared/auth/state/auth.state';
import { Plan } from '../../shared/models/plan.model';
import { getProductByPlanId } from '../../shared/helpers/product.utils';

@State<ProjectStateModel>({
  name: 'project',
  defaults: {
    projectList: [],
    seletcedProjectId: undefined,
    addProjectError: undefined
  }
})
export class ProjectState implements NgxsOnInit {
  constructor(private projectService: ProjectService) {}

  @Selector()
  static projectList(state: ProjectStateModel) {
    return state.projectList;
  }

  @Selector([AuthState.currentPlan, PriceState.productList])
  static maxProjects(state: ProjectStateModel, plan: Plan, productList: Product[]) {
    return getProductByPlanId(productList, plan.id).maxProjects;
  }

  @Selector([ProjectState.maxProjects])
  static maxProjectsReached(state: ProjectStateModel, maxProjects: number) {
    return maxProjects <= state.projectList.length;
  }

  @Action(ProjectsLoadedAction)
  projectsLoaded({ patchState }: StateContext<ProjectStateModel>, { payload }: ProjectsLoadedAction) {
    patchState({
      projectList: payload.map(project => this.addBackgroundToProject(project))
    });
  }

  @Action(ProjectAddAction)
  async addProject({ getState, patchState }: StateContext<ProjectStateModel>, { payload }: ProjectAddAction) {
    const projectList = getState().projectList;
    projectList.push(this.addBackgroundToProject(payload));
    patchState({
      projectList
    });

    try {
      const project = await this.projectService.addProject(payload).toPromise();
      const projectListUpdate = cloneDeep(getState().projectList);

      const foundProject = find(projectListUpdate, { name: project.name });
      merge(foundProject, project);
      return patchState({
        projectList: projectListUpdate
      });
    } catch (error) {
      return patchState({
        addProjectError: error,
        projectList: getState().projectList.filter(project => project.name !== payload.name)
      });
    }
  }

  @Action(ProjectDeleteAction)
  async deleteProject({ getState, patchState }: StateContext<ProjectStateModel>, { payload }: ProjectDeleteAction) {
    const project = await this.projectService.deleteProject(payload).toPromise();

    const projectList = cloneDeep(getState().projectList);
    remove(projectList, { id: project.id });
    patchState({ projectList });
  }

  @Action(ProjectSubscribeAction)
  subscribeToProject() {
    return this.projectService.subscribeProjects();
  }

  private addBackgroundToProject(project: Project) {
    const from = '#' + Hexcolor.toHexColour(project.name);
    const to = Hexcolor.shadeColor(from, -0.35);

    return { ...project, background: `linear-gradient(to left, ${from}, ${to})` } as Project;
  }

  ngxsOnInit({ dispatch }: StateContext<ProjectStateModel>) {
    dispatch(new ProjectSubscribeAction());
  }
}
