import React from 'react'
import FavouriteFolderTable from './FavouriteFolderTable'
// import TableEdit from 'tg_components/TableEdit'
// import ReactTable from './ReactTable'
// import useTableForm from '../hooks/useTableForm'


export default function ProjectsTable() {

    // const [tableState, tableReducer] = useTableForm();
    // useEffect(() => {
    //     console.log(tableState);
    //     console.log(tableReducer);
    // },[])
    // console.log(tableState);
	return (<>
        {/* <TableEdit tableState={tableState} tableReducer={tableReducer} /> */}
        {/* <TableEdit /> */}
        <FavouriteFolderTable />
    </>)
}

