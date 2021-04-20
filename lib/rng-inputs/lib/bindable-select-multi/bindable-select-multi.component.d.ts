import { BindableSelectComponent } from '../bindable-select/bindable-select.component';
export declare class BindableSelectMultiComponent extends BindableSelectComponent {
  multiple: boolean;
  readonly selectionCount: number;
  readonly valueName: string;
  protected fieldCSSGetter(): string[];
  protected currentValue(oldValue: any[]): any;
}
