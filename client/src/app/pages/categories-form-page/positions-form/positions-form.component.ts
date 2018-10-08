import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionsService} from '../../../shared/services/positions.service';
import {Position} from '../../../shared/interfaces/position.interface';
import {MaterialInstance, MaterialService} from '../../../shared/classes/material.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() categoryId: string;
  positions: Position[] = [];
  loading = false;
  @ViewChild('modal') modalRef: ElementRef;
  modal: MaterialInstance;
  positionId = null;

  form: FormGroup;

  constructor(private positionsService: PositionsService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)])
    });
    this.loading = true;
    this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions;
      this.loading = false;

    });
  }

  ngOnDestroy() {
    this.modal.destroy();
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef);
  }

  onSelectPosition(p: Position) {
    this.positionId = p._id;
    this.form.patchValue({
      name: p.name,
      cost: p.cost
    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onAddPosition() {
    this.positionId = null;
    this.form.reset({
      name: null,
      cost: 1
    });
    this.modal.open();
    MaterialService.updateTextInputs();
  }

  onCancel() {
    this.modal.close();
  }

  onSubmit() {
    this.form.disable();

    const newPosition: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    };

    const completed = () => {
      this.modal.close();
      this.form.enable();
      this.form.reset({name: '' , cost: 1});
    };
    if (this.positionId) {
      newPosition._id = this.positionId;
      this.positionsService.update(newPosition).subscribe(
        pos => {
          const idx = this.positions.findIndex(p => p._id === pos._id);
          this.positions[idx] = pos;
          MaterialService.toast('Позиция обновлена');
        },
        error1 => {
          MaterialService.toast(error1.error.message);
        },
        completed
      );
    } else {
      this.positionsService.create(newPosition).subscribe(
        pos => {
          MaterialService.toast('Позиция создана');
          this.positions.push(pos);
        },
        error1 => {
          MaterialService.toast(error1.error.message);
        },
        completed
      );
    }
  }

  onDeletePosition(event: Event, pos: Position) {
    event.stopPropagation();
    const  decision = window.confirm(`Удалить позицию ${pos.name}?`);
    if (decision) {
      this.positionsService.delete(pos).subscribe(
        response => {
          const idx = this.positions.findIndex(p => p._id === pos._id);
          this.positions.splice(idx, 1);
          MaterialService.toast(response.message);
        }
        ,
        error1 => {
          MaterialService.toast(error1.error.message);
        }
      );
    }

  }
}
