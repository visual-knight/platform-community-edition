import { Project } from '../../shared/models/project.model';

export interface ProjectStateModel {
  projectList: Project[];
  seletcedProjectId: string;
  addProjectError: Error;
}
