declare module 'chart.js' {
  import { Chart, ChartType } from 'chart.js';
  export * from 'chart.js';
}

declare module 'react-chartjs-2' {
  import { 
    Chart as ChartJS,
    ChartData,
    ChartOptions,
    ChartType,
    DefaultDataPoint,
    Plugin
  } from 'chart.js';

  interface ChartProps<
    TType extends ChartType = ChartType,
    TData = DefaultDataPoint<TType>,
    TLabel = unknown
  > {
    data: ChartData<TType, TData, TLabel>;
    options?: ChartOptions<TType>;
    plugins?: Plugin<TType>[];
    type?: ChartType;
    height?: number;
    width?: number;
    redraw?: boolean;
    fallbackContent?: React.ReactNode;
    updateMode?: 'resize' | 'reset' | 'none' | 'hide' | 'show' | 'normal' | 'active';
  }

  export class Line<TData = DefaultDataPoint<'line'>, TLabel = unknown> extends React.Component<
    ChartProps<'line', TData, TLabel>
  > {}

  export class Bar<TData = DefaultDataPoint<'bar'>, TLabel = unknown> extends React.Component<
    ChartProps<'bar', TData, TLabel>
  > {}

  export class Doughnut<TData = DefaultDataPoint<'doughnut'>, TLabel = unknown> extends React.Component<
    ChartProps<'doughnut', TData, TLabel>
  > {}
}
