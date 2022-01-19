const dict = {
    SystemName: {cn: '交互式战术挖掘系统', en: 'IPAM'},

}

const words = Object.keys(dict);
const strings = Object.fromEntries(words.map(word => [word, word]));
export default strings;

export const languagePacks = {
    cn: { translation: Object.fromEntries(words.map(word => [word, dict[word].cn])) },
    en: { translation: Object.fromEntries(words.map(word => [word, dict[word].en])) },
};
