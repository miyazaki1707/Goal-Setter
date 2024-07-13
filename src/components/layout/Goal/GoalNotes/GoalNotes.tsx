import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import Plus from "../../../ui/Plus/Plus";
import { openModal } from "../../../../store/modals/modalReducer";
import NoteEditor from "../../../modals/editNoteModal/NoteEditor";
import { useState } from "react";
import { Note } from "../../../../store/goals/goals.interface";

export default function GoalNotes() {
  const location = useLocation();
  const { goal } = location.state || {};
  const goals = useSelector((state: RootState) => state.goals.goals);
  const notes = goals.find((g) => g.id === goal.id)?.notes || [];
  const dispatch = useDispatch();
  const [selectedNote, setSelectedNote] = useState<Note>();
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);

    const options: any = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

    return formattedDate;
  };

  const editNote = (note: Note) => {
    dispatch(openModal());
    setSelectedNote(note);
  };

  return (
    <div className={`px-4 mt-8 ${isOpen ? "overflow-hidden" : ""}`}>
      {notes.length > 0 ? (
        notes.map((n) => {
          return (
            <div
              onClick={() => editNote(n)}
              className='mb-10 cursor-pointer'
              key={n.id}>
              <div className='text-[20px] text-[#2C66BC] mb-2'>{n.title}</div>
              <div className='mb-4'>
                <img
                  className='max-w-[156px] max-h-[156px] rounded-xl'
                  src={n.imageUrl}
                  alt='noteImg'
                />
              </div>
              <div className='text-[14px] mb-2'>{n.text}</div>
              <div className='text-[13px] text-[#D7D6D6]'>{formatDate(n.date)}</div>
            </div>
          );
        })
      ) : (
        <div className=' flex max-h-screen flex-col justify-center items-center text-center'>
          <svg
            className='fill-[#494949] max-w-[188px] max-h-[188px] w-[100%] h-[100%] mb-5'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 470.333 470.333'>
            <g>
              <g>
                <path
                  d='M235.167,470.333c129.767,0,235.167-105.4,235.167-235.167S364.933,0,235.167,0S0,105.4,0,235.167
            S105.4,470.333,235.167,470.333z M235.167,34c110.783,0,201.167,90.383,201.167,201.167S345.95,436.333,235.167,436.333
            S34,345.95,34,235.167S124.383,34,235.167,34z'
                />
                <path
                  d='M164.333,196.633c7.083,0,13.883-2.833,18.983-7.933c10.483-10.483,10.483-27.483,0-37.967
            c-5.1-5.1-11.9-7.933-18.983-7.933s-13.883,2.833-18.983,7.933c-10.483,10.483-10.483,27.483,0,37.967
            C150.45,193.8,157.25,196.633,164.333,196.633z'
                />
                <path
                  d='M299.2,196.633c7.083,0,13.883-2.833,18.983-7.933c10.483-10.483,10.483-27.483,0-37.967
            c-5.1-5.1-11.9-7.933-18.983-7.933s-13.883,2.833-18.983,7.933c-10.483,10.483-10.483,27.483,0,37.967
            C285.317,193.8,291.833,196.633,299.2,196.633z'
                />
                <path
                  d='M157.25,328.667c0.567-1.7,11.617-38.25,73.667-38.25c64.033,0,82.167,38.817,82.733,40.233
            c2.833,6.517,9.067,10.483,15.583,10.483c2.267,0,4.25-0.283,6.517-1.417c8.783-3.683,12.75-13.6,9.067-22.1
            c-1.133-2.55-26.35-61.2-114.183-61.2c-89.533,0-105.967,61.2-106.533,63.75l16.433,4.25L157.25,328.667z'
                />
              </g>
            </g>
          </svg>
          <p className='h-full text-[24px] text-[#D7D6D6]'>
            this goal <b> doesn't have</b> notes
          </p>
        </div>
      )}
      {!goal.archived ? <Plus page={`goal/${goal.id}/createNote`} /> : <></>}
      <NoteEditor note={selectedNote} />
    </div>
  );
}
