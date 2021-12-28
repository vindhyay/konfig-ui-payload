import { BindableComponent } from '../bindable/bindable.component';
export declare class BindableSelectComponent extends BindableComponent {
  returnKey: string;
  valueKey: string | null;
  items: any[] | null;
  disableOptionCentering: boolean | null;
  nameKey: string | null;
  disabled: boolean;
  multiple: boolean;
  readonly valueName: string;
  protected valueNameGetter(currentValue: any): string;
  protected fieldCSSGetter(): string[];
  protected valueGetter(): any;
  protected currentValue(oldValue: any): any;
}
