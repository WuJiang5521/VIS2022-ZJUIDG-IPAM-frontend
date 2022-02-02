import {useCallback, useState} from "react";

export const types = [
    {
        objective: 'TacticSet',
        types: [
            {
                type: 'LimitIndex',
                params: ['min', 'max'],
            },
            {
                type: 'LimitLength',
                params: ['min', 'max', 'offset'],
            },
        ]
    },
    {
        objective: 'Attribute',
        types: [
            {
                type: 'SetExistence',
                params: [{key: 'exist', label: '是否考虑'}],
            },
            {
                type: 'SetImportance',
                params: [{key: 'importance', label: '重要度变化'}],
            },
        ]
    },
    {
        objective: 'Tactic',
        types: [
            {
                type: 'Delete',
                params: [{key: 'index', label: '战术编号'}],
            },
            {
                type: 'Split',
                params: [{key: 'index', label: '战术编号'}, {key: 'attr', label: '针对属性细分'}, {key: 'value', label: '针对值细分'}],
            },
            {
                type: 'Merge',
                params: [{key: 'index', label: '战术编号'}],
            },
        ]
    },
    {
        objective: 'Hit',
        types: [
            {
                type: 'Increment',
                params: [{key: 'index', label: '战术编号'}, {key: 'direction', label: '扩展方向'}, {
                    key: 'hitCount',
                    label: '扩展拍数'
                }],
            },
            {
                type: 'Decrement',
                params: [{key: 'index', label: '战术编号'}, {key: 'hits', label: '忽略的拍序号'}],
            },
        ]
    },
    {
        objective: 'Value',
        types: [
            {
                type: 'Replace',
                params: [{key: 'index', label: '战术编号'}, {key: 'hit', label: '拍'}, {
                    key: 'attr',
                    label: '属性'
                }, {key: 'target', label: '目标值'}],
            },
            {
                type: 'Ignore',
                params: [{key: 'index', label: '战术编号'}, {key: 'hit', label: '拍'}, {key: 'attr', label: '属性'}],
            },
            {
                type: 'Explore',
                params: [{key: 'index', label: '战术编号'}, {key: 'hit', label: '拍'}, {key: 'attr', label: '属性'}],
            },
        ]
    }
]

export function findQueryType(type) {
    for (const tc of types)
        for (const t of tc.types)
            if (t.type === type)
                return t;
    return null;
}

export const useQueryParams = () => {
    const [queryParams, setQueryParams] = useState({
        type: null,
        params: null,
    })
    const clearQueryParams = useCallback(() => setQueryParams({
        type: null,
        params: null,
    }), []);
    const validateSetQueryParams = useCallback(newOnes =>
        setQueryParams(oldOnes => ({
            ...oldOnes,
            ...newOnes
        })), []);
    const isApplicable = () => {
        return queryParams.type !== null;
    }
    return {
        queryParams,
        setQueryParams: validateSetQueryParams,
        clearQueryParams,
        isApplicable,
    }
}