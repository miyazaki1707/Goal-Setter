import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Goal, Note } from "../../../store/goals/goals.interface";
import { closeModal } from "../../../store/modals/modalReducer";
import { useEffect, useState } from "react";
import Input from "../../ui/Input/Input";
import { Button } from "../../ui/Button/button";
import { useLocation } from "react-router-dom";
import { editNote } from "../../../store/goals/goalsSlice";

type Props = {
  note?: Note;
};
export default function NoteEditor({ note }: Props) {
  const { pathname } = useLocation();
  const goals = useSelector((state: RootState) => state.goals.goals);
  const goal = goals.find((goal: Goal) => goal.id === Number(pathname.split("/")[2]));

  const [preview, setPreview] = useState<string>(note ? note.imageUrl : "");
  const [noteName, setNoteName] = useState<string>(note ? note.title : "");
  const [noteText, setNoteText] = useState<string>(note ? note.title : "");
  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const dispatch = useDispatch();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (isOpen) {
      if (note) {
        setNoteName(note.title);
        setPreview(note.imageUrl);
        setNoteText(note.text);
      }
    }
  }, [note]);
  const editaNote = () => {
    if (note && goal) {
      dispatch(closeModal());
      dispatch(
        editNote({
          goalIndex: goal.id,
          noteId: note.id,
          newNote: {
            id: note.id,
            title: noteName,
            imageUrl: preview,
            text: noteText,
            date: note.date,
          },
        }),
      );
    }
  };
  return (
    <div
      className={`${
        isOpen ? "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30" : "hidden"
      } pb-10`}>
      <div className='bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 rounded-lg'>
        <div className='flex justify-between items-center'>
          <button onClick={() => dispatch(closeModal())}>
            <svg
              width='22'
              height='22'
              viewBox='0 0 22 22'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M5.09174 12.216L12.6984 19.8302L11.0075 21.5374L0.462646 10.9925L11.0238 0.45517L12.7222 2.16986L5.09174 9.80029H21.5449V12.216H5.09174Z'
                fill='#494949'
              />
            </svg>
          </button>
        </div>
        <div className='mt-4'>
          <div className='mb-4 max-w-[320px] w-full h-[232px] flex justify-center items-center'>
            <input
              type='file'
              accept='image/*'
              className='hidden'
              id='photo-upload'
              onChange={handleFileChange}
            />
            <label
              className=' max-w-[320px] w-full h-[232px] flex justify-center items-center'
              htmlFor='photo-upload'>
              {preview !== "" ? (
                <img
                  src={preview}
                  alt='Preview'
                  className='max-w-[320px] w-full h-[232px] flex justify-center items-center rounded-xl'
                />
              ) : (
                <div className='max-w-[320px] w-full h-[232px] flex justify-center items-center flex-col bg-[#EBEBEB] rounded-xl'>
                  <svg
                    width='67'
                    height='60'
                    viewBox='0 0 74 67'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M60.7484 20.2904V13.2031H53.6909V7.96453H60.7969V0.847504H66.0448V8.01289H73.1338V13.2516H65.9964V20.2904H60.7484ZM33.3756 54.4123C37.2165 54.4123 40.4355 53.115 43.0325 50.5203C45.6295 47.9256 46.928 44.7128 46.928 40.8819C46.928 37.038 45.6263 33.8145 43.023 31.2113C40.4198 28.608 37.2009 27.3064 33.3662 27.3064C29.4794 27.3064 26.2503 28.606 23.679 31.2053C21.1077 33.8046 19.822 37.0371 19.822 40.9028C19.822 44.7269 21.1103 47.9345 23.6869 50.5256C26.2634 53.1168 29.493 54.4123 33.3756 54.4123ZM33.3535 48.6345C31.1407 48.6345 29.2952 47.8973 27.8171 46.4227C26.3389 44.9483 25.5998 43.1087 25.5998 40.9039C25.5998 38.6471 26.3408 36.7765 27.8226 35.2921C29.3045 33.8077 31.1571 33.0656 33.3806 33.0656C35.5519 33.0656 37.3928 33.7982 38.9032 35.2635C40.4136 36.7288 41.1688 38.5976 41.1688 40.8699C41.1688 43.09 40.4221 44.9391 38.9286 46.4173C37.4351 47.8954 35.5767 48.6345 33.3535 48.6345ZM6.82102 66.9684C5.21966 66.9684 3.81276 66.3622 2.60031 65.1497C1.38781 63.9372 0.781563 62.5303 0.781563 60.929V20.8679C0.781563 19.2803 1.38781 17.8737 2.60031 16.6481C3.81281 15.4226 5.21971 14.8098 6.82102 14.8098H17.7941L23.9032 8.01289H49.0034V17.8906H56.1094V24.9779H65.9871V60.929C65.9871 62.5303 65.3743 63.9372 64.1488 65.1497C62.9232 66.3622 61.5166 66.9684 59.929 66.9684H6.82102Z'
                      fill='#AAAAAA'
                    />
                  </svg>
                  <p className='pt-4 text-[#AAAAAA]'>Add photo</p>
                </div>
              )}
            </label>
          </div>
        </div>
        <div className='mb-4'>
          <Input
            type='text'
            value={noteName}
            change={(e) => setNoteName(e.target.value)}
            placeholder='Note Name'
          />
        </div>
        <div className='mb-4'>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            className='w-full mb-4 px-4 py-2 bg-[#FAFAFA] border-[2px] border-[#EBEBEB] rounded-xl resize-vertical min-h-[100px] outline-none'
          />
        </div>
        <Button
          onClick={() => editaNote()}
          variant='create'>
          Edit a note
        </Button>
      </div>
    </div>
  );
}
