import { 
  Directive, 
  ElementRef,
  HostBinding, 
  HostListener, 
  Input,
  OnInit, 
  Renderer2 
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue';
  @HostBinding("style.backgroundColor") backgroundColor: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // Before anything is rendered, but our values become available
    this.backgroundColor = this.defaultColor;

    /* Angular is not limited to running in the browser here, it for example also works with service workers and these are environments where you might not have access to the DOM. So if you try to change the DOM as you did in basic highlight by directly accessing the native element and the style of this element, you might get an error in some circumstances. Now to be honest, in most circumstances you probably don't and you probably also know if your app is going to run in the browser or not, still it is a better practice to use the renderer for DOM access and to use the methods the renderer provides to access the DOM. */
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', "blue");
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', "blue");
    this.backgroundColor = this.highlightColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', "transparent");
    this.backgroundColor = this.defaultColor;
  }

}
