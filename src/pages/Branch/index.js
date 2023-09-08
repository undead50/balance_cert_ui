import { Button, Card } from "antd";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {syncBranchAsync} from '../../store/slices/branchSlice'


function SyncBranch() {

    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(syncBranchAsync())
    }

    
    const { loading } = useSelector((state) => state.branch)
    return (<>
        <Card>
        <Button type="primary" onClick={handleClick} shape="round" loading={loading}>
    Sync Branch    
    </Button></Card></>);
}

export default SyncBranch;