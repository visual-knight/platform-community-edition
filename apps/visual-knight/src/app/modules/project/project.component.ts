import { Component, OnInit } from '@angular/core';
import { Project } from '@generated/photonjs';

@Component({
  selector: 'visual-knight-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  // createProject() {
  //   this.dialog.open(AddProjectComponent);
  // }

  // deleteProject(project: Project) {
  //   this.dialog
  //     .open(DeleteModalComponent, { data: project })
  //     .beforeClose()
  //     .subscribe(result => {
  //       if (result) {
  //         this.onDeleteProject(project);
  //       }
  //     });
  // }

  // copiedId(project: Project) {
  //   this.snackBar.open(`${project.id}`, 'Copied', {
  //     duration: 5000
  //   });
  // }

  onDeleteProject(project: Project) {}

  trackPojectItems(index: number, project: Project): string {
    return project.id;
  }
}
