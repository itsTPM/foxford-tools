interface ProfileData {
  full_name: string;
  created_at: string;
  avatar_url: string;
  bonus_amount: number;
}

interface LevelData {
  gained_xp: number;
  total_xp: number;
  level: number;
  available_xp: number;
}

interface GetProfileDataResponse extends ProfileData {
  [key: string]: unknown;
}

interface GetLevelDataResponse extends LevelData {
  [key: string]: unknown;
}

interface LessonTasksStats {
  solved_tasks_count: number;
  partially_tasks_count: number;
  failed_tasks_count: number;
  tasks_count: number;
}

interface LessonStatsResponse {
  visiting_state: string;
  classwork: LessonTasksStats;
  homework: LessonTasksStats;
}

interface ConspectData {
  name: string;
  course: { id: number; name: string };
  discipline: { color: string; image_url: string };
}

interface LessonData {
  title: string;
}
