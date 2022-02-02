const dict = {
    SystemName: {cn: '交互式战术挖掘系统', en: 'IPAM'},
    Dataset: {cn: '数据集', en: 'Dataset'},
    Player: {cn: '球员', en: 'Player'},
    Opponents: {cn: '对手', en: 'Opponents'},
    SeqCount: {cn: '回合数', en: 'Sequence Count'},

    QueryView: {cn: '查询视图', en: 'Query View'},
    PreviewChange: {cn: '预览', en: 'Preview'},
    ApplyChange: {cn: '确认', en: 'Apply'},
    EmptyType: {cn: '选择修改类型', en: 'Select Query Type'},

    PreviewView: {cn: '预览视图', en: 'Preview View'},
    TacticView: {cn: '战术视图', en: 'Tactic View'},
    RallyView: {cn: '回合视图', en: 'Rally View'},
    ProjectView: {cn: '投影视图', en: 'Project View'},
}

const words = Object.keys(dict);
const strings = Object.fromEntries(words.map(word => [word, word]));
export default strings;

export const languagePacks = {
    cn: { translation: Object.fromEntries(words.map(word => [word, dict[word].cn])) },
    en: { translation: Object.fromEntries(words.map(word => [word, dict[word].en])) },
};
