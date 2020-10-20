import {Component, ContentChild, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {IIconInfo} from '../icon-list/icon-list.component';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent implements OnInit, OnChanges {
  open: boolean = false;


  @Input() buttonLabel: string = '';
  @Input() iconSrc: string | SafeHtml;
  @ContentChild('collapseContent', {static: false, read: ElementRef}) inputContent: ElementRef;


  constructor(
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.iconSrc && changes.iconSrc.currentValue) {
      this.iconSrc = this.sanitizer.bypassSecurityTrustHtml(changes.iconSrc.currentValue);
    }
  }

  changeStateAccordion() {
    this.open = !this.open;
  }
}
