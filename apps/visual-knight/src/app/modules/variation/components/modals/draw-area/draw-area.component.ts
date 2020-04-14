import { Component, OnInit, Inject } from '@angular/core';
import Konva from 'konva';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DeleteVariationModalComponent } from '../delete-variation/delete-variation.component';
import { IgnoreAreaType } from '../../../../core/types';
import { VariationService } from '../../../services/variation.service';

@Component({
  selector: 'visual-knight-draw-area',
  templateUrl: './draw-area.html',
  styleUrls: ['./draw-area.scss']
})
export class DrawAreaComponent implements OnInit {
  variationId: string;
  imageUrl: string;
  ignoreAreas: IgnoreAreaType[];
  stage: Konva.Stage;
  imageLayer: Konva.Layer;
  shapeLayer: Konva.Layer;

  constructor(
    private variationService: VariationService,
    public dialogRef: MatDialogRef<DeleteVariationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.variationId = data.variationId;
    this.imageUrl = data.imageUrl;
    this.ignoreAreas = data.ignoreAreas;
  }

  ngOnInit(): void {
    this.stage = new Konva.Stage({
      container: 'container',
      width: window.innerWidth * 0.9,
      height: window.innerHeight * 0.8
    });

    // create image layer
    this.imageLayer = new Konva.Layer();
    this.stage.add(this.imageLayer);

    // add shapes layer
    this.shapeLayer = new Konva.Layer();
    this.stage.add(this.shapeLayer);
    // draw all ignore areas
    this.ignoreAreas.forEach(ignoreArea => this.addRectangle(ignoreArea));

    // add image onload callback
    const imageObj = new Image();
    imageObj.src = this.data.imageUrl;
    imageObj.onload = () => this.imageOnload(imageObj);
  }

  imageOnload(imageObj) {
    // change stage size according to image
    this.stage.height(imageObj.height);
    this.stage.width(imageObj.width);

    const backgroundImage = new Konva.Image({
      image: imageObj
    });
    this.imageLayer.add(backgroundImage);
    this.stage.draw();
  }

  save() {
    const newIgnoreAreas: IgnoreAreaType[] = this.shapeLayer
      .getChildren(child => child.getClassName() === 'Rect')
      .toArray()
      .map(rectangle => {
        return {
          x: Math.round(rectangle.x()),
          y: Math.round(rectangle.y()),
          height: Math.round(rectangle.height() * rectangle.scaleY()),
          width: Math.round(rectangle.width() * rectangle.scaleX())
        };
      });
    this.variationService.setNewIgnoreAreas(this.variationId, newIgnoreAreas);
    this.dialogRef.close();
  }

  addRectangle(ignoreArea: IgnoreAreaType) {
    const rectangle = new Konva.Rect({
      x: ignoreArea ? ignoreArea.x : this.imageLayer.width() / 4,
      y: ignoreArea ? ignoreArea.y : this.imageLayer.height() / 4,
      width: ignoreArea ? ignoreArea.width : this.imageLayer.width() / 2,
      height: ignoreArea ? ignoreArea.height : this.imageLayer.height() / 2,
      fill: 'gray',
      draggable: true,
      opacity: 0.6,
      dragBoundFunc: function(pos) {
        const component = this as Konva.Rect;
        const rectWidth = component.width() * component.scaleX();
        const rectHeight = component.height() * component.scaleY();
        const layerSize = component.getLayer().getSize();

        return {
          x: pos.x > 0 ? Math.min(layerSize.width - rectWidth, pos.x) : 0,
          y: pos.y > 0 ? Math.min(layerSize.height - rectHeight, pos.y) : 0
        };
      }
    });

    const tr = new Konva.Transformer({
      node: rectangle,
      rotateEnabled: false,
      keepRatio: false
    });

    /// prevent negative scaling
    tr.on('transform', function() {
      if (rectangle.scaleX() < 0) {
        tr.stopTransform();
        rectangle.scaleX(0);
      }
      if (rectangle.scaleY() < 0) {
        tr.stopTransform();
        rectangle.scaleY(0);
      }
    });

    this.shapeLayer.add(rectangle);
    this.shapeLayer.add(tr);
    this.shapeLayer.draw();
  }

  clearAll() {
    this.shapeLayer.destroyChildren();
    this.shapeLayer.draw();
  }
}
