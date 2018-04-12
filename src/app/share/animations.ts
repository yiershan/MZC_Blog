import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';
//入场浮动效果
export const Float = trigger('Float', [
  transition(':enter', [
    style({ opacity: 0.5,transform: 'translate3d(-10px,10px,0)'}),
    animate(500)
  ])
]);

export const Bubble = trigger('Bubble', [
  transition('*=>Bubble', [
    animate(500, style({ opacity: 0,transform: 'scale(1.5)'}))
  ]),
  transition('*=>UnBubble', [
    animate(500, style({ opacity: 0,transform: 'scale(0.5)'}))
  ])
]);
