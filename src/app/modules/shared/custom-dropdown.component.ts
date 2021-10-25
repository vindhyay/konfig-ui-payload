import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortalDirective } from '@angular/cdk/portal';
import { Component, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'custom-dropdown',
  template: `
    <ng-template cdk-portal>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class CustomDropdownComponent {
  @Input()
  public reference: HTMLElement;

  @Input()
  public minWidth: number;

  @Input()
  public offsetX: number = 0;

  @Input()
  public backdropClickClose: boolean = true;
  // @ts-ignore
  @ViewChild(TemplatePortalDirective)
  public contentTemplate: TemplatePortalDirective;

  protected overlayRef: OverlayRef;

  public showing = false;

  constructor(protected overlay: Overlay) {}

  public show() {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => {
      if (this.backdropClickClose) {
        this.hide();
      }
    });
    this.showing = true;
  }

  public hide() {
    this.overlayRef.detach();
    this.showing = false;
  }

  @HostListener('window:resize')
  public onWinResize() {
    this.syncWidth();
  }

  protected getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.reference)
      .withPush(false)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom'
        }
      ])
      .withDefaultOffsetX(this.offsetX);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      ...(this.minWidth && { minWidth: this.minWidth }),
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });
  }

  private syncWidth() {
    if (!this.overlayRef) {
      return;
    }

    const refRect = this.reference.getBoundingClientRect();
    this.overlayRef.updateSize({ width: refRect.width });
  }
}
