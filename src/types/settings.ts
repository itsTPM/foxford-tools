import type { Component } from 'vue';

export interface SettingConfig {
  title: string;
  id: string;
}

export interface SettingGroup {
  title: string;
  id: string;
  icon: Component;
  settings: SettingConfig[];
}
