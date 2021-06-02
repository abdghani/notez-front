import React, { createContext, useState, useEffect } from 'react';
import { addMemosQuery, fetchMemoQuery, removeMemoQuery } from '../components/gql/memo';
import { useQuery, useMutation } from '@apollo/react-hooks';
export const MemoContext = createContext();

export const MemoContextProvider = (props) => {

    let to_date = new Date()
    let from_date = new Date()
    from_date.setDate(to_date.getDate() - 7); 
    const [ daterange, setDateRange] = useState([from_date, to_date]);
    const [ memos, setMemos] = useState([]);
    const [ addNewMemo, { loading: loadingAddMemo, error: mutationAddError }] = useMutation(addMemosQuery);
    const [ removeMemo, { loading: loadingRemoveMemo, error: mutationRemoveError }] = useMutation(removeMemoQuery);

    const { loading: loadingMemo, data: memosFetched } =  useQuery(fetchMemoQuery, {
                                                            variables:{
                                                                fdate: daterange[0],
                                                                tdate: daterange[1]
                                                            }
                                                        })

    // const removeMemo = (_memo) => {
    //     setMemos([...memos].filter(memo => memo.id != _memo.id))
    // }

    useEffect(() => {
        if(memosFetched != undefined){
            setMemos(memosFetched.fetchMemo)
        }
    }, [!loadingMemo])

    return (
        <MemoContext.Provider value={{
                daterange,
                setDateRange,
                addNewMemo,
                loadingMemo,
                setMemos,
                removeMemo,
                memos
        }}>
            {props.children}
        </MemoContext.Provider>
    )
}