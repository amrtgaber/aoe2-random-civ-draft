import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { draftGet, selectDrafts } from '../../store/slices/drafts-slice';
import './draft.scss';

export interface IDraftProps {}

export const Draft: FC<IDraftProps> = (props) => {
  const { draft } = useAppSelector(selectDrafts);

  const [searchParams] = useSearchParams();
  const draftId: string = searchParams.get('d') ?? '';

  const [nameValue, setNameValue] = useState(draft?.name ?? '');
  const [descValue, setDescValue] = useState(draft?.desc ?? '');

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (draftId && !draft) {
      dispatch(draftGet(draftId));
    }
  }, []);

  useEffect(() => {
    setNameValue(draft?.name ?? '');
    setDescValue(draft?.desc ?? '');
  }, [draft]);

  const handleEditName = (element: ChangeEvent<HTMLInputElement>) => {
    const newName = element.target.value;
    setNameValue(newName);
  };

  const handleEditDescription = (element: ChangeEvent<HTMLInputElement>) => {
    const newDescription = element.target.value;
    setDescValue(newDescription);
  };

  return (
    <div className='draft-name-container'>
      <input
        className='draft-name'
        value={nameValue}
        onChange={handleEditName}
        placeholder='add a draft name'
      />
      <input
        className='draft-description'
        value={descValue}
        onChange={handleEditDescription}
        placeholder='add a draft description'
      />
    </div>
  );
};
