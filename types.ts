
export enum AppView {
  Labs = 'Labs',
  Visualizations = 'Visualizations',
  Quizzes = 'Quizzes',
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface LabData {
  id: string;
  title: string;
  description: string;
  initialHtml: string;
  initialCss: string;
  initialJs: string;
  hint: string;
}

export interface DragItem {
  id: number;
  text: string;
  pairId: number;
}

export interface DropTarget {
  id: number;
  text: string;
  pairId: number;
}
