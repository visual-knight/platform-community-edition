import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddProjectModalComponent } from './components/modals/add-new-project/project-add.component';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';
import { Observable } from 'rxjs';
import { Hexcolor } from '../shared/utils/hexcolor';
import { AllProjectsGQL, ProjectType } from '../../../modules/core/types';
import { map } from 'rxjs/operators';

@Component({
  selector: 'visual-knight-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
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
    private projectGQL: AllProjectsGQL
  ) {}

  ngOnInit() {}

  createProject() {
    this.dialog.open(AddProjectModalComponent);
  }

  deleteProject(project: ProjectType) {
    this.dialog
      .open(DeleteModalComponent, { data: project })
      .beforeClosed()
      .subscribe(result => {
        if (result) {
          this.onDeleteProject(project);
        }
      });
  }

  copiedId(project: ProjectType) {
    this.snackBar.open(`${project.id}`, 'Copied', {
      duration: 5000
    });
  }

  onDeleteProject(project: ProjectType) {}

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
