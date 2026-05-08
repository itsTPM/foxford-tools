interface SettingConfig {
  title: string;
  id: string;
}

interface SettingGroup {
  title: string;
  id: string;
  settings: SettingConfig[];
}
