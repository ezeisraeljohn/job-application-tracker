export interface Job {
  id: number;
  title: string;
  company: string;
  status: string;
  appliedDate: string;
  notes: string;
  applyLink?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthPayLoad {
  name?: string;
  email: string;
  password: string;
}

export type LoginResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    token: string;
    user: {
      id: number;
      name: string;
      email: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

export type JobResponse = {
  success: boolean;
  status: number;
  message: string;
  data: Job[];
};

export type FeedbackResponse = {
  success: boolean;
  status: number;
  message: string;
  data: [];
};

export type RecommendationResponse = {
  success: boolean;
  status: number;
  message: string;
  data: Job[];
};
