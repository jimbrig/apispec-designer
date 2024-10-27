export type ViewerType = 'redoc' | 'swagger' | 'rapidoc';

export interface ViewerOption {
  id: ViewerType;
  label: string;
  icon: string;
}