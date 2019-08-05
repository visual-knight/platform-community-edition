import { Variation } from './variation.model';
import { Project } from './project.model';
export interface Test {
  name: string;
  id?: string;
  project: Project;
  variations: Variation[];
  successfullVariations: number;
  failedVariations: number;
}
