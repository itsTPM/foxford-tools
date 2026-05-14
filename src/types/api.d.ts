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

type TaskStatus = 'started' | 'not_started' | 'hinted' | 'in_queue' | 'unavailable' | 'solved' | 'partially' | 'failed'

interface Task {
  status: TaskStatus
}

interface ClassworkStats {
  solved_tasks_count: number
  partially_tasks_count: number
  failed_tasks_count: number
}

interface LessonTasksStats {
  classwork: ClassworkStats
}

interface ConspectData {
  name: string
  course: { id: number; name: string }
  discipline: { color: string; image_url: string }
}

interface LessonData {
  title: string
}
