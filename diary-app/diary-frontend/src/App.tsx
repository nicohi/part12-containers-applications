import { useState, useEffect } from "react";
import axios from "axios";

import { NewDiaryEntry, NonSensitiveDiaryEntry, Weather, Visibility } from "./types";
import diaryService from './services/diaries';
import Notification from './components/Notification';

const initialDiary:NewDiaryEntry = {
  date: '',
  weather: Weather.Windy,
  visibility: Visibility.Ok,
  comment: '',
};

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDiary, setNewDiary] = useState<NewDiaryEntry>(initialDiary);

  const [message, setMessage] = useState<string>('');

  const notify = (m:string) => {
    setMessage(m);
    setTimeout(() => setMessage(''), 3000);
  };

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const data = await diaryService.create(newDiary);
      await setDiaries(diaries.concat(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.status)
        console.error(error.response);
        if (error.response && error.response.data)
          notify(error.response.data);
      } else {
        console.error(error);
      }
    }
    setNewDiary(initialDiary);
  };

  type radioFunction = ( s: string ) => () => void

  const makeRadio = (name:string, t : object, fn : radioFunction) => (
    <div>
    {name}: {Object.values(t).map(o => <>{o}<input name={name} type='radio' value={o as string} onChange={fn(o)} /> </>)}
    </div>
  );

  return (
    <div>
      <h1>Add new entry</h1>
      <Notification message={message} />
      <form onSubmit={diaryCreation}>
        <div>date:<input value={newDiary.date} onChange={(event) => setNewDiary({ ...newDiary, date: event.target.value})} /></div>
        {makeRadio('weather', Weather, s => () => setNewDiary({ ...newDiary, weather: s as Weather }))}
        {makeRadio('visibility', Visibility, s => () => setNewDiary({ ...newDiary, visibility: s as Visibility }))}
        <div>comment:<input value={newDiary.comment} onChange={(event) => setNewDiary({ ...newDiary, comment: event.target.value})} /></div>
        <button type='submit'>add</button>
      </form>
      <h1>entries</h1>
      <ul>
        {diaries.map(diary =>
          <li key={diary.id}>
            <div>{diary.date}</div>
            <div>{diary.weather}</div>
            <div>{diary.visibility}</div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default App;
