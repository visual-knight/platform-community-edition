import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddProjectModalComponent } from './components/modals/add-new-project/project-add.component';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';
import { Observable } from 'rxjs';
import { Hexcolor } from '../shared/utils/hexcolor';
import {
  AllProjectsGQL,
  ProjectType,
  DeleteProjectGQL,
  AddProjectGQL,
  AllProjectsDocument,
  AllProjectsQuery
} from '../core/types';
import { map } from 'rxjs/operators';
import { vkAnimations } from '../shared/animations';
import { ProjectService } from './services/project.service';

@Component({
  selector: 'visual-knight-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: [vkAnimations]
})
export class ProjectComponent implements OnInit {
  projectList$: Observable<
    ProjectType[]
  > = this.projectGQL
    .watch()
    .valueChanges.pipe(map(result => result.data.projects));

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private projectService: ProjectService,
    private projectGQL: AllProjectsGQL,
    private deleteProjectGQL: DeleteProjectGQL
  ) {}

  ngOnInit() {}

  createProject() {
    this.dialog
      .open(AddProjectModalComponent)
      .beforeClosed()
      .subscribe(({ name, description }) => {
        if (name) {
          this.projectService.addProject({ name, description }).toPromise();
        }
      });
  }

  deleteProject(project: ProjectType) {
    this.dialog
      .open(DeleteModalComponent, { data: project })
      .beforeClosed()
      .subscribe(result => {
        if (result) {
          this.projectService
            .deleteProject({ projectId: project.id })
            .toPromise();
        }
      });
  }

  copiedId(project: ProjectType) {
    this.snackBar.open(`${project.id}`, 'Copied', {
      duration: 5000
    });
  }

  trackPojectItems(index: number, project: ProjectType): string {
    return project.id;
  }

  getBackgroundForProject(project: ProjectType) {
    const from = '#' + Hexcolor.toHexColour(project.name);
    const to = Hexcolor.shadeColor(from, -0.35);

    return {
      ...project,
      background: `linear-gradient(to left, ${from}, ${to})`
    } as ProjectType;
  }
}