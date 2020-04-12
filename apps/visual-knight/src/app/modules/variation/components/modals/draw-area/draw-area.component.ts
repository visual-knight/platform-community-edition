import { Component, OnInit, Inject } from '@angular/core';
import Konva from 'konva';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteVariationModalComponent } from '../delete-variation/delete-variation.component';
import { da } from 'date-fns/locale';

@Component({
  selector: 'visual-knight-draw-area',
  templateUrl: './draw-area.html',
  styleUrls: ['./draw-area.scss']
})
export class DrawAreaComponent implements OnInit {
  imageUrl: string;
  ignoreAreas: Konva.Rect[] = [];
  stage: Konva.Stage;
  layer: Konva.Layer;
  // selectedButton: any = {
  //   rectangle: false,
  //   undo: false,
  //   erase: false
  // };
  // erase = false;
  transformers: Konva.Transformer[] = [];

  constructor(
    public dialogRef: MatDialogRef<DeleteVariationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.imageUrl = data.imageUrl;
  }

  ngOnInit(): void {
    let width = window.innerWidth * 0.9;
    let height = window.innerHeight;

    this.stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height
    });

    // add background
    const imageObj = new Image();
    imageObj.src = this.data.imageUrl;
    imageObj.onload = () => this.addBackground(imageObj);
  }

  addBackground(imageObj) {
    this.layer = new Konva.Layer();

    const background = new Konva.Image({
      image: imageObj,
      draggable: true
    });

    // add cursor styling
    background.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
    });
    background.on('mouseout', function() {
      document.body.style.cursor = 'default';
    });

    this.layer.add(background);
    this.stage.add(this.layer);

    this.addTransformerListeners();
  }

  addRectangle() {
    const rectangle = new Konva.Rect({
      x: 20,
      y: 20,
      width: 100,
      height: 50,
      fill: 'gray',
      stroke: 'black',
      strokeWidth: 1,
      draggable: true,
      opacity: 0.6
    });

    rectangle.transformsEnabled('all')

    this.ignoreAreas.push(rectangle);
    this.layer.add(rectangle);
    this.stage.add(this.layer);
  }

  // clearSelection() {
  //   Object.keys(this.selectedButton).forEach(key => {
  //     this.selectedButton[key] = false;
  //   });
  // }
  // setSelection(type: string) {
  //   this.selectedButton[type] = true;
  // }

  // addShape(type: string) {
  //   this.clearSelection();
  //   this.setSelection(type);
  //   if (type === 'rectangle') {
  //     this.addRectangle();
  //   }
  // }

  // undo() {
  //   const removedShape = this.shapes.pop();
  //   this.transformers.forEach(t => {
  //     t.detach();
  //   });
  //   if (removedShape) {
  //     removedShape.remove();
  //   }
  //   this.layer.draw();
  // }

  addTransformerListeners() {
    const component = this;
    const tr = new Konva.Transformer({
      rotateEnabled: false
    });
    this.stage.on('click', function(e) {
      if (!this.clickStartShape) {
        return;
      }
      if (e.target._id === this.clickStartShape._id && this.clickStartShape.className === 'Rect') {
        component.layer.add(tr);
        tr.attachTo(e.target);
        component.transformers.push(tr);
        component.layer.draw();
      } else {
        tr.detach();
        component.layer.draw();
      }
    });
    // const component = this;
    // const tr = new Konva.Transformer();

    // this.stage.on('click', function(e) {
    //   // if click on empty area - remove all transformers
    //   if (e.target === component.stage) {
    //     component.stage.find('Transformer').destroy();
    //     component.layer.draw();
    //     return;
    //   }
    //   // do nothing if clicked NOT on our rectangles
    //   if (!e.target.hasName('rect')) {
    //     return;
    //   }

      
    //   component.layer.add(tr);
    //   tr.attachTo(e.target);
    //   component.layer.draw();
    // });
  }

  // addDeleteListener(shape) {
  //   const component = this;
  //   window.addEventListener('keydown', function(e) {
  //     if (e.keyCode === 46) {
  //       shape.remove();
  //       component.transformers.forEach(t => {
  //         t.detach();
  //       });
  //       e.preventDefault();
  //     }
  //     component.layer.batchDraw();
  //   });
  // }
}
