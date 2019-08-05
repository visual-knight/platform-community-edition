import { Component, OnInit } from '@angular/core';
import { ProjectState } from '../state/project.state';
import { Select, Store } from '@ngxs/store';
import { Project } from '../../shared/models/project.model';
import { Observable } from 'rxjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddProjectComponent } from '../modals/add-new-project/project-add.component';
import { DeleteModalComponent } from '../modals/delete-modal/delete-modal.component';
import { ProjectDeleteAction } from '../state/project.actions';
import { vkAnimations } from '../../shared/animations/animations';

@Component({
  selector: 'vk-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  animations: vkAnimations
})
export class ProjectComponent implements OnInit {
  @Select(ProjectState.projectList) projectList$: Observable<Project[]>;
  @Select(ProjectState.maxProjectsReached) maxProjectsReached$: Observable<boolean>;
  @Select(ProjectState.maxProjects) maxProjects$: Observable<number>;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar, private store: Store) {}

  ngOnInit() {}

  createProject() {
    this.dialog.open(AddProjectComponent);
  }

  deleteProject(project: Project) {
    this.dialog
      .open(DeleteModalComponent, { data: project })
      .beforeClose()
      .subscribe(result => {
        if (result) {
          this.onDeleteProject(project);
        }
      });
  }

  copiedId(project: Project) {
    this.snackBar.open(`${project.id}`, 'Copied', {
      duration: 5000
    });
  }

  onDeleteProject(project: Project) {
    this.store.dispatch(new ProjectDeleteAction(project));
  }

  trackPojectItems(index, project: Project): string {
    return project.id;
  }
}
