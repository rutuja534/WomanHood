import CryptoJS from 'crypto-js';

const STORAGE_KEY = 'pregnancy_tracker_data';
const ENCRYPTION_KEY = 'your-secure-key'; // In production, this should be environment-specific

interface StorageData {
  weekNumber: number;
  symptoms: string[];
  appointments: Array<{
    date: string;
    title: string;
    notes: string;
  }>;
  moodEntries: Array<{
    date: string;
    mood: string;
    notes: string;
  }>;
  measurements: Array<{
    date: string;
    weight: number;
    bloodPressure: string;
  }>;
}

export const encryptData = (data: StorageData): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), ENCRYPTION_KEY).toString();
};

export const decryptData = (encryptedData: string): StorageData | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, ENCRYPTION_KEY);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  } catch (error) {
    console.error('Error decrypting data:', error);
    return null;
  }
};

export const saveData = (data: StorageData): void => {
  const encryptedData = encryptData(data);
  localStorage.setItem(STORAGE_KEY, encryptedData);
};

export const loadData = (): StorageData | null => {
  const encryptedData = localStorage.getItem(STORAGE_KEY);
  if (!encryptedData) return null;
  return decryptData(encryptedData);
};