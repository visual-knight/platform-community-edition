import {
  trigger,
  animate,
  style,
  transition,
  state,
  animation,
  useAnimation,
  sequence,
  query,
  stagger
} from '@angular/animations';

const reusable = animation(
  [
    style({
      opacity: '{{opacity}}',
      transform: 'scale({{scale}}) translate3d({{x}}, {{y}}, {{z}})'
    }),
    animate('{{duration}} {{delay}} cubic-bezier(0.0, 0.0, 0.2, 1)', style('*'))
  ],
  {
    params: {
      duration: '200ms',
      delay: '0ms',
      opacity: '0',
      scale: '1',
      x: '0',
      y: '0',
      z: '0'
    }
  }
);

export const vkAnimations = [
  trigger('animate', [transition('void => *', [useAnimation(reusable)])]),

  trigger('fadeInOut', [
    state(
      '0',
      style({
        opacity: 0,
        display: 'none'
      })
    ),
    state(
      '1',
      style({
        opacity: 1,
        display: 'block'
      })
    ),
    transition('0 => 1', animate('300ms')),
    transition('1 => 0', animate('300ms'))
  ])
];

export const rowsAnimation = trigger('rowsAnimation', [
  transition('void => *', [
    useAnimation(
      animation(
        [
          style({ opacity: '0' }),
          sequence([animate('{{duration}} {{delay}}', style({ opacity: 1 }))])
        ],
        {
          params: {
            duration: '300ms',
            delay: '0ms'
          }
        }
      )
    )
  ])
]);

export const filterAnimation = trigger('filterAnimation', [
  transition(':enter, * => 0, * => -1', []),
  transition(':increment', [
    query(
      ':enter',
      [
        style({ opacity: 0, width: '0px' }),
        stagger(50, [
          animate('300ms ease-out', style({ opacity: 1, width: '*' }))
        ])
      ],
      { optional: true }
    )
  ]),
  transition(':decrement', [
    query(':leave', [
      stagger(50, [
        animate('300ms ease-out', style({ opacity: 0, width: '0px' }))
      ])
    ])
  ])
]);
