import { db, extractData } from '@/firebase/config';
import { collection, getDocs, query } from 'firebase/firestore';
import { GameType } from '../types';

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
