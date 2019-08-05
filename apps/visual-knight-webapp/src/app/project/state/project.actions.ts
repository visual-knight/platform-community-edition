import { Project } from '../../shared/models/project.model';

export class ProjectSubscribeAction {
  static readonly type = '[Project] Subscribe projects';
}
export class ProjectsLoadedAction {
  static readonly type = '[Project] projects Loaded';
  constructor(public payload: Project[]) {}
}
export class ProjectAddAction {
  static readonly type = '[Project] Add';
  constructor(public payload: Project) {}
}
export class ProjectDeleteAction {
  static readonly type = '[Project] Delete';
  constructor(public payload: Project) {}
}
