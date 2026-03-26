import { http } from "./http";
import type {
  AuthPayload,
  LeaderboardEntry,
  LessonDetail,
  LessonResult,
  LessonSummary,
  UserProfile
} from "../types";

export const loginApi = async (payload: { email: string; password: string }) => {
  const { data } = await http.post<AuthPayload>("/auth/login", payload);
  return data;
};

export const registerApi = async (payload: {
  email: string;
  password: string;
  username: string;
}) => {
  const { data } = await http.post<AuthPayload>("/auth/register", payload);
  return data;
};

export const meApi = async () => {
  const { data } = await http.get<UserProfile>("/user/me");
  return data;
};

export const lessonsApi = async () => {
  const { data } = await http.get<LessonSummary[]>("/lessons");
  return data;
};

export const lessonApi = async (lessonId: string) => {
  const { data } = await http.get<LessonDetail>(`/lessons/${lessonId}`);
  return data;
};

export const completeLessonApi = async (
  lessonId: string,
  answers: string[],
  speechScores?: Array<number | null>
) => {
  const { data } = await http.post<LessonResult>(`/lessons/${lessonId}/complete`, {
    answers,
    speechScores
  });
  return data;
};

export const leaderboardApi = async () => {
  const { data } = await http.get<LeaderboardEntry[]>("/leaderboard");
  return data;
};
