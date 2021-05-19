import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Optional, Output, Self} from '@angular/core';
import { ControlValueAccessor, NgControl, ValidatorFn, Validators } from '@angular/forms';
import {hasRequiredField} from "../../../../../lib/finlevit-library/src/lib/utils";

@Component({
  selector: 'finlevit-file-upload',
  templateUrl: './finlevit-file-upload.component.html',
  styleUrls: ['./finlevit-file-upload.component.scss']
})
export class FinlevitFileUploadComponent implements ControlValueAccessor, OnInit {
  constructor(@Optional() @Self() public controlDir: NgControl, private host: ElementRef<HTMLInputElement>) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }
  @Input() label: string = '';
  @Input() tooltip: string = '';
  @Input() isRequired: boolean = false;
  @Input() errorMsg: string = '';
  @Input() error: boolean = false;
  @Input() loading: boolean = true;
  @Input() disabled: boolean = false;
  @Input() showErrorBorder: boolean = true;
  @Input() validators: any = [];
  @Input() uploadButton : boolean = false;
  @Output() btnClick = new EventEmitter();
  onChange: Function;
  form: FormData = new FormData();

  public file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }
  ngOnInit() {
    const control = this.controlDir && this.controlDir.control;
    if (control) {
      const validators: ValidatorFn[] = control.validator ? [control.validator] : [];
      if (this.isRequired) {
        validators.push(Validators.required);
      }
      if (this.validators && this.validators.length) {
        this.validators.forEach(validator => {
          validators.push(validator);
        });
      }
      control.setValidators(validators);
      control.updateValueAndValidity();
      this.isRequired = hasRequiredField(control);
    }
  }

  writeValue(value: null) {
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: Function) {
    this.onChange = fn;
  }

  registerOnTouched(fn: Function) {}
  checkError() {
    return (this.controlDir && !this.controlDir.control.valid && this.controlDir.control.touched) || this.error;
  }
  getErrorMessages() {
    const errors = this.controlDir.control.errors;
    const errorMessages = [];
    Object.keys(errors).forEach(error => {
      switch (error) {
        case 'required':
          errorMessages.push(`${this.label} is required`);
          break;
        case 'minlength':
        case 'maxlength':
          errorMessages.push(
            `Expected atleast length ${errors[error].requiredLength} but got ${errors[error].actualLength}`
          );
          break;
        case 'custom':
          errorMessages.push(errors[error]);
          break;
      }
    });
    return errorMessages;
  }
  onBtnClick(){
    this.btnClick.emit(this.form)
  }
  uploadImage($event) {
    const [file] = $event.target.files;
    this.form.append('file', file);
  }
}
