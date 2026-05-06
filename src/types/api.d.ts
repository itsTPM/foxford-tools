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

interface GetLevelDataReponse extends LevelData {
  [key: string]: unknown;
}
