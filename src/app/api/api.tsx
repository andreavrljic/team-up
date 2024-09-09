import { db, extractData } from '@/firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { GameType, SportType } from '../types';

export const getGames = async (): Promise<GameType[] | undefined> => {
  try {
    const gameCollection = collection(db, 'games');
    const q = query(gameCollection);
    const records = await getDocs(q);
    const data = extractData(records);
    return data;
  } catch (error) {
    console.log('Get matches error', error);
  }
};

export const getGamesByType = async (
  type: SportType
): Promise<GameType[] | undefined> => {
  try {
    const gameCollection = collection(db, 'games');
    const q = query(gameCollection, where('type', '==', type));
    const records = await getDocs(q);
    const data = extractData(records);
    return data;
  } catch (error) {
    console.log('Get matches by type error', error);
  }
};
