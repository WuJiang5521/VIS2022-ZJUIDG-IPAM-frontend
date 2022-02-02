/**
 * Created by Jiang Wu on 2022/1/29
 */

import {inject, observer} from "mobx-react";
import {Box, Button, Chip, Divider, IconButton, Menu, MenuItem, TextField, Typography} from "@mui/material";
import {Add} from "@mui/icons-material";
import {useTranslation} from "react-i18next";
import strings from "../../static/strings";
import {useState} from "react";
import {findQueryType, types} from "./useQueryParams";

function TypesMenu({anchorEl, onClose, onSelect}) {
    const typeItems = [];
    types.forEach(tc => {
        typeItems.push(
            <Divider key={tc.objective}>{tc.objective}</Divider>
        )
        tc.types.forEach(t => {
            typeItems.push(
                <MenuItem key={t.type}
                          onClick={() => onSelect(t.type)}>
                    {t.type}
                </MenuItem>
            )
        })
    });
    return <Menu anchorEl={anchorEl}
                 open={Boolean(anchorEl)}
                 onClose={onClose}>
        {typeItems}
    </Menu>;
}

function ParamsMenu({anchorEl, onClose, onSelect, type}) {
    const t = findQueryType(type);
    return <Menu anchorEl={anchorEl}
                 open={Boolean(anchorEl)}
                 onClose={onClose}>
        {t && t.params.map(p => (
            <MenuItem key={p}
                      onClick={() => onSelect(p)}>{p}</MenuItem>
        ))}
    </Menu>;
}

function FormQuery({queryParams, setQueryParams, clearQueryParams}) {
    const {t} = useTranslation();

    const [typeBtn, setTypeBtn] = useState(null);
    const handleOpenTypesMenu = e => setTypeBtn(e.currentTarget)
    const handleCloseTypesMenu = () => setTypeBtn(null);
    const handleSelectType = t => {
        setQueryParams({
            type: t,
            params: {},
        });
        handleCloseTypesMenu();
    }

    const [paramBtn, setParamBtn] = useState(null);
    const handleOpenParamMenu = e => setParamBtn(e.currentTarget)
    const handleCloseParamMenu = () => setParamBtn(null);
    const [inputParam, setInputParam] = useState(null);
    const handleSelectParam = param => {
        setInputParam([param, '']);
        handleCloseParamMenu();
    };
    const handleChangeInputParam = e => setInputParam([inputParam[0], e.target.value]);
    const handleInputParam = () => {
        setQueryParams({
            params: {
                ...queryParams.params,
                [inputParam[0]]: inputParam[1],
            }
        });
        setInputParam(null);
    }
    const handleDelete = key => () => {
        const params = JSON.parse(JSON.stringify(queryParams.params));
        delete params[key];
        setQueryParams({params});
    };

    return <Box>
        <Box>
            <Button onClick={handleOpenTypesMenu}>
                {t(queryParams.type || strings.EmptyType)}
            </Button>
        </Box>
        <Box>
            {
                queryParams.params &&
                Object.entries(queryParams.params).map(([key, value]) => (
                    <Chip key={key}
                          label={`${key}: ${value}`}
                          sx={{marginLeft: 0.5}}
                          onDelete={handleDelete(key)}/>
                ))
            }
            {
                inputParam &&
                <Box display={'inline-flex'} alignItems={'center'}>
                    <Typography variant={'subtitle2'} sx={{margin: 1}}>{inputParam[0]}: </Typography>
                    <TextField value={inputParam[1]}
                               variant={"filled"}
                               size={"small"}
                               hiddenLabel
                               autoFocus
                               onChange={handleChangeInputParam}
                               onKeyDown={e => e.key === 'Enter' && handleInputParam()}/>
                </Box>
            }
            {
                queryParams.type && !inputParam &&
                <IconButton onClick={handleOpenParamMenu}>
                    <Add/>
                </IconButton>
            }
        </Box>

        <TypesMenu anchorEl={typeBtn}
                   onClose={handleCloseTypesMenu}
                   onSelect={handleSelectType}/>

        <ParamsMenu anchorEl={paramBtn}
                    type={queryParams.type}
                    onClose={handleCloseParamMenu}
                    onSelect={handleSelectParam}/>
    </Box>;
}

export default inject()(observer(FormQuery));
