import { Component, OnInit } from '@angular/core';
import { Project } from '@generated/photonjs';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AddProjectModalComponent } from './components/modals/add-new-project/project-add.component';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';
import { Observable } from 'rxjs';
import { Hexcolor } from '../shared/utils/hexcolor';

@Component({
  selector: 'visual-knight-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  projectList$: Observable<Project[]>;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit() {}

  createProject() {
    this.dialog.open(AddProjectModalComponent);
  }

  deleteProject(project: Project) {
    this.dialog
      .open(DeleteModalComponent, { data: project })
      .beforeClosed()
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

  onDeleteProject(project: Project) {}

  trackPojectItems(index: number, project: Project): string {
    return project.id;
  }

  getBackgroundForProject(project: Project) {
    const from = '#' + Hexcolor.toHexColour(project.name);
    const to = Hexcolor.shadeColor(from, -0.35);

    return {
      ...project,
      background: `linear-gradient(to left, ${from}, ${to})`
    } as Project;
  }
}
