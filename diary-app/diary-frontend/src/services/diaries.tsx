import axios from "axios";
import { NonSensitiveDiaryEntry, NewDiaryEntry } from "../types";

export const apiBaseUrl = 'http://localhost:8080/api';

const getAll = async () => {
  const { data } = await axios.get<NonSensitiveDiaryEntry[]>(
    `${apiBaseUrl}/diaries`
  );

  return data;
};

//const isNumber = (text: unknown): text is number => {
  //return !isNaN(Number(text));
//};

const create = async (object: NewDiaryEntry) : Promise<NonSensitiveDiaryEntry> => {
  const { data }  = await axios.post<NonSensitiveDiaryEntry>(
    `${apiBaseUrl}/diaries`,
    object
  );
  return data;
};

const diaryService = {
  getAll, create
};

export default diaryService;
