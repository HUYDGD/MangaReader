import { AsyncStatus, MangaStatus } from '~/utils';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PayloadAction } from '@reduxjs/toolkit';
import { Plugin } from '~/plugins';

declare global {
  type GET = 'GET' | 'get';
  type POST = 'POST' | 'post';
  type FetchResponseAction<T = undefined> = PayloadAction<
    undefined extends T
      ? { error?: Error; taskId?: string }
      :
          | { error: Error; data?: undefined; taskId?: string }
          | { error?: undefined; data: T; taskId?: string }
  >;
  type ActionParameters<T = Function> = PayloadAction<Parameters<T>[0]>;

  type RootStackParamList = {
    Home: undefined;
    Search: undefined;
    Result: { keyword: string };
    Detail: { mangaHash: string };
    Chapter: { mangaHash: string; chapterHash: string; page: number };
    Plugin: undefined;
    About: undefined;
  };
  type StackHomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
  type StackSearchProps = NativeStackScreenProps<RootStackParamList, 'Search'>;
  type StackResultProps = NativeStackScreenProps<RootStackParamList, 'Result'>;
  type StackDetailProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;
  type StackChapterProps = NativeStackScreenProps<RootStackParamList, 'Chapter'>;
  type StackPluginProps = NativeStackScreenProps<RootStackParamList, 'Plugin'>;
  type StackAboutProps = NativeStackScreenProps<RootStackParamList, 'About'>;

  declare interface Manga {
    href: string;
    hash: string;
    source: Plugin;
    sourceName: string;
    mangaId: string;
    cover: string;
    title: string;
    latest: string;
    updateTime: string;
    author: string;
    tag: string;
    status: MangaStatus;
    chapters: ChapterItem[];
    lastWatchChapter?: string;
    lastWatchPage?: number;
  }
  declare interface ChapterItem {
    hash: string;
    mangaId: string;
    chapterId: string;
    href: string;
    title: string;
  }
  declare interface Chapter {
    hash: string;
    mangaId: string;
    chapterId: string;
    name: string;
    title: string;
    headers: {
      [index: string]: string;
    };
    images: string[];
  }

  declare interface RootState {
    app: {
      launchStatus: AsyncStatus;
      syncStatus: AsyncStatus;
      clearStatus: AsyncStatus;
      batchStatus: AsyncStatus;
    };
    plugin: {
      source: Plugin;
      list: { name: string; label: string; value: Plugin; disabled: boolean }[];
    };
    search: {
      page: number;
      isEnd: boolean;
      loadStatus: AsyncStatus;
      list: string[];
    };
    update: {
      page: number;
      isEnd: boolean;
      loadStatus: AsyncStatus;
      list: string[];
    };
    favorites: { mangaHash: string; isTrend: boolean }[];
    manga: {
      loadStatus: AsyncStatus;
    };
    chapter: {
      loadStatus: AsyncStatus;
    };
    dict: {
      manga: {
        [key: string]: Manga | undefined;
      };
      chapter: {
        [key: string]: Chapter | undefined;
      };
    };
  }

  interface String {
    splic(f: string): string[];
  }
}
