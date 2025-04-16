import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightSalary]'
})
export class HighlightSalaryDirective implements OnInit {
  @Input() appHighlightSalary!: number; // Input to receive the salary value

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    if (this.appHighlightSalary < 15000) {
      this.el.nativeElement.style.color = 'red'; // Highlight salary in green if > 10000
    }
    else if(this.appHighlightSalary >=15000 && this.appHighlightSalary<=35000){
      this.el.nativeElement.style.color='orange'; // Highlight salary in orange if > 15000 and <= 35000
    }
    else {
      this.el.nativeElement.style.color = 'green'; // Highlight salary in red if <= 10000
    }
  }
}