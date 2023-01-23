import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import IClip from 'src/app/models/clip.model';
import { ClipService } from 'src/app/services/clip.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  @Input() activeClip: IClip | null = null
  @Output() update = new EventEmitter()
  showAlert = false
  inSubmission = false
  alertColor = 'blue'
  alertMsg = 'Your video is being uploaded'
  
  constructor(
    private modal: ModalService,
    private clipService: ClipService
  ){}

  editForm = new FormGroup({
    clipID: new FormControl('', {
      nonNullable: true
    }),
    title: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3)
      ], 
      nonNullable: true}),
  })

  ngOnChanges(changes: SimpleChanges): void {
    if(!this.activeClip) return;
    
    this.inSubmission = false
    this.showAlert = false
   
    this.editForm.controls.clipID.setValue(this.activeClip.docID as string)
    this.editForm.controls.title.setValue(this.activeClip.title)
  }

  ngOnInit(): void {
    this.modal.register('editClip')
  }
  ngOnDestroy(): void {
    this.modal.unregister('editClip')
  }

  async submit(){
    if(!this.activeClip) return;
    this.inSubmission = true
    this.showAlert = true
    this.alertColor = 'blue'
    this.alertMsg = 'Your video is being uploaded'
  
    try {
      await this.clipService.updateClip(
        this.editForm.controls.clipID.value, 
        this.editForm.controls.title.value)      
    } catch (error) {
      this.inSubmission = false
      this.alertColor = 'red'
      this.alertMsg = 'Something went wrong. Try again later'
      return
    }
    this.activeClip.title = this.editForm.controls.title.value
    this.update.emit(this.activeClip)

    this.inSubmission = false
    this.alertColor = 'green'
    this.alertMsg = 'Success!'

  }
}
