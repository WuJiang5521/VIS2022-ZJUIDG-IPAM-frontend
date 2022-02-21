import Toolbar from "../Common/Toolbar";
import styled from "@emotion/styled";
import {playerColors} from "../../static/theme";
import {Box, Tooltip} from "@mui/material";
import {Info} from "@mui/icons-material";
import winRate2color from "../../utils/winRate2color";


const ProjectViewToolbar = () => <Toolbar elements={[
    <Tooltip title={
        <table>
            <tbody>
            <tr>
                <td>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Circle style={{width: 15, height: 15, margin: 5}}/>
                        <Circle/>
                    </Box>
                </td>
                <td>Frequency</td>
            </tr>
            <tr>
                <td>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <div style={{
                            width: '100%',
                            height: 15,
                            background: `linear-gradient(to right, ${winRate2color(1)}, ${winRate2color(0.5)} 50%, ${winRate2color(0)})`,
                        }}/>
                    </Box>
                </td>
                <td>Win Rate</td>
            </tr>
            <tr>
                <td>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Circle style={{border: '2px solid black'}}/>
                    </Box>
                </td>
                <td>Old tactics</td>
            </tr>
            <tr>
                <td>
                    <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                        <Circle style={{border: '2px dashed black'}}/>
                    </Box>
                </td>
                <td>New tactics</td>
            </tr>
            </tbody>
        </table>
    }>
        <Info/>
    </Tooltip>
]}/>;

const Circle = styled('div')({
    borderRadius: '50%',
    width: 25,
    height: 25,
    backgroundColor: playerColors[0],
})

export default ProjectViewToolbar;
