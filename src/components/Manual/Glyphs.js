import SymbolSet, {symbolSets} from "../TacticView/SymbolSets";
import figure1 from './fig3.png';
import figure2 from './fig1.png';
import figure3 from './fig2.png';

const desc = {
    Badminton: {
        'Ball Height': {
            desc: 'The position where after the player hit the ball,the ball fell on the opposite field or hit by the opponent before it dropped, except StartingTee value. Starting Tee value describes where the player served the ball.',
            values: {
                'Very low': "The height of the shuttle was lower than 0.55m.",
                'Low': "The height of the shuttle was lower than 1.25m and higher than 0.55m.",
                'Medium': "The height of the shuttle was lower than 2m and higher than 1.25m.",
                'High': "The height of the shuttle was higher than 2m.",
            }
        },
        'Ball Position': {
            desc: 'The pose that the player used to hit the ball. It is related to the position where the player was and the technique that the player used.',
            images: [
                {src: figure1, caption: 'Figure 1. Badminton Ball Position on the court.'},
            ],
            values: {
                'Backcourt Left': 'See BL in Fig. 1.',
                'Backcourt Right': 'See BR in Fig. 1.',
                'Midfield Left': 'See ML in Fig. 1.',
                'Midfield Right': 'See MR in Fig. 1.',
                'Forecourt Left': 'See FL in Fig. 1.',
                'Forecourt Right': 'See FR in Fig. 1.',
            }
        },
        'Hit Technique': {
            desc: 'The technique that the player used to hit the ball.',
            values: {
                'Net service': 'Player served near the net.',
                'Backcourt service': 'Player served in the backcourt.',
                'Smash': 'Player used the technique of smash.',
                'Drive': 'Player used the technique of drive.',
                'Lift': 'Player used the technique of lift.',
                'High clear': 'Player used the technique of high clear.',
                'Hook': 'Player used the technique of hook.',
                'Shot': 'Player used the technique of shot.',
                'Net shot': 'Player used the technique of net shot.',
                'Drop': 'Player used the technique of drop.',
                'Push': 'Player used the technique of push.',
                'Block': 'Player used the technique of block.',
                'Other': 'Player used other techniques which cannot be recognized.',
                'Score': 'Player scored.',
            }
        },
    },
    Tennis: {
        'Ball Position': {
            desc: 'The height of the shuttle when it was hit by the player.',
            images: [
                {src: figure2, caption: 'Figure 2. Tennis Serving Ball Position on the court.'},
                {src: figure3, caption: 'Figure 3. Tennis Ball Position on the court.'}
            ],
            values: {
                'Starting Tee 1': 'Player served the ball in the right half of the middle area.',
                'Starting Tee 2': 'Player served the ball in the right half area.',
                'Starting Tee 3': 'Player served the ball in the left half of the middle area.',
                'Starting Tee 4': 'Player served the ball in the left half area.',
                'Serving right zone outside corner': 'Player served and the ball fell in SRO of the opposite field. (See SRO in Fig. 2)',
                'Serving right zone midway': 'Player served and the ball fell in SRM of the opposite field. (See SRM in Fig. 2)',
                'Serving right zone inside corner': 'Player served and the ball fell in SRI of the opposite field. (See SRI in Fig. 2)',
                'Serving left zone outside corner': 'Player served and the ball fell in SLO of the opposite field. (See SLO in Fig. 2)',
                'Serving left zone midway': 'Player served and the ball fell in SLM of the opposite field. (See SLM in Fig. 2)',
                'Serving left zone inside corner': 'Player served and the ball fell in SLI of the opposite field. (See SLI in Fig. 2)',
                'Right zone front': 'Player hit the ball and the ball fell in RF of the opposite field. (See RF in Fig. 3)',
                'Right zone midfront': 'Player hit the ball and the ball fell in RMF of the opposite field. (See RMF in Fig. 3)',
                'Right zone midback': 'Player hit the ball and the ball fell in RMB of the opposite field. (See RMB in Fig. 3)',
                'Right zone back': 'Player hit the ball and the ball fell in RB of the opposite field. (See RB in Fig. 3)',
                'Midright zone front': 'Player hit the ball and the ball fell in MRF of the opposite field. (See MRF in Fig. 3)',
                'Midright zone midfront': 'Player hit the ball and the ball fell in MRMF of the opposite field. (See MRMF in Fig. 3)',
                'Midright zone midback': 'Player hit the ball and the ball fell in MRMB of the opposite field. (See MRMB in Fig. 3)',
                'Midright zone back': 'Player hit the ball and the ball fell in MRB of the opposite field. (See MRB in Fig. 3)',
                'Midleft zone front': 'Player hit the ball and the ball fell in MLF of the opposite field. (See MLF in Fig. 3)',
                'Midleft zone midfront': 'Player hit the ball and the ball fell in MLMF of the opposite field. (See MLMF in Fig. 3)',
                'Midleft zone midback': 'Player hit the ball and the ball fell in MLMB of the opposite field. (See MLMB in Fig. 3)',
                'Midleft zone back': 'Player hit the ball and the ball fell in MLB of the opposite field. (See MLB in Fig. 3)',
                'Left zone front': 'Player hit the ball and the ball fell in LF of the opposite field. (See LF in Fig. 3)',
                'Left zone midfront': 'Player hit the ball and the ball fell in LMF of the opposite field. (See LMF in Fig. 3)',
                'Left zone midback': 'Player hit the ball and the ball fell in LMB of the opposite field. (See LMB in Fig. 3)',
                'Left zone back': 'Player hit the ball and the ball fell in LB of the opposite field. (See LB in Fig. 3)',
                'RF RMF MRF MRMF no drop point': 'The opponent hit the ball in RF, RMF, MRF, or MRMF before it dropped.',
                'RB RMB MRB MRMB no drop point': 'The opponent hit the ball in RB, RMB, MRB, or MRMB before it dropped.',
                'LF LMF MLF MLMF no drop point': 'The opponent hit the ball in LF, LMF, MLF, or MLMF before it dropped.',
                'LB LMB MLB MLMB no drop point': 'The opponent hit the ball in LB, LMB, MLB, or MLMB before it dropped.',
                'Unexpected ball': 'Ball wiped the net.',
            }
        },
        'Hitting Pose': {
            desc: 'The horizontal position of the shuttle when it washit by the player.',
            values: {
                'Starting Tee 1': "Player served the ball in the midright zone.",
                'Starting Tee 2': "Player served the ball in the right zone.",
                'Starting Tee 3': "Player served the ball in the midleft zone.",
                'Starting Tee 4': "Player served the ball in the left zone.",
                'Back sideway': "Player hit the ball using forehand technique in the forehand area.",
                'Forehand': "Player hit the ball using backhand technique in the backhand area.",
                'Backhand': "Player hit the ball using forehand technique in the backhand area.",
                'Sideway': "Player hit the ball using backhand technique in the forehand area.",
                'Untouch': "Player untouched the ball.",
            }
        },
        'Hit Technique': {
            desc: 'The technique that the player used to hit the shuttle.',
            values: {
                'Overhand serving': 'Player overhand served.',
                'Underhand serving': 'Player Underhand served.',
                'Drive': 'Player used the technique of driving the ball with a forehand or backhand hitting pose.',
                'Drive in the air': 'Player used the technique of driving the ball in the air with a forehand or backhand hitting pose.',
                'Smash': 'Player used the technique of smash.',
                'Ground smash': 'Player used the technique of ground smash.',
                'Volley': 'Player used the technique of volleying.',
                'Drop shot': 'Player used the technique of drop shot.',
                'Push and block': 'Player used the technique of push and block.',
                'Half volley': 'Player used the technique of half volley.',
                'Lob': 'Player used the technique of lob.',
                'Slice': 'Player used the technique of slice.',
                'Other': 'Player used other techniques which cannot be recognized.',
            }
        },
    }
}

export default function Glyphs() {
    return <div style={{padding: 20, width: 800, overflow: "hidden visible"}}>
        {Object.keys(symbolSets).map(ds => {
            const symbolSet = SymbolSet.dataset(ds);
            return <>
                <h1 style={{color: 'rgb(17,150,240)'}}>{ds}</h1>
                {Object.keys(symbolSets[ds]).map(attr => {
                    const renderer = symbolSet.attr(attr).size(80);
                    const images = desc[ds][attr].images;

                    return <div style={{pageBreakAfter: "always"}}>
                        <h3 style={{color: 'rgb(17,150,240)'}}>{attr}</h3>
                        <p style={{width: 720, textAlign: "justify"}}>{desc[ds][attr].desc}</p>
                        <table style={{
                            tableLayout: 'fixed',
                            borderTop: '3px solid black',
                            borderBottom: '3px solid black'
                        }}>
                            <thead>
                            <tr>
                                <th style={{
                                    width: 100,
                                    borderBottom: '1px solid black',
                                    textAlign: 'center'
                                }}>Variable
                                </th>
                                <th style={{width: 120, borderBottom: '1px solid black', textAlign: 'center'}}>Glyph
                                    Component
                                </th>
                                <th style={{
                                    width: 500,
                                    borderBottom: '1px solid black',
                                    textAlign: 'center'
                                }}>Desc.
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(symbolSets[ds][attr].params).map((value, vId) => {
                                const style = {
                                    padding: 10,
                                    textAlign: 'center',
                                    backgroundColor: vId % 2 ? 'rgb(248, 248, 248)' : 'rgb(255, 255, 255)',
                                }
                                return <tr>
                                    <td style={style}>{value}</td>
                                    <td style={style}>
                                        <svg width={80} height={80} viewBox={'0 0 100 100'} style={{margin: 10}}>
                                            <g transform={'translate(50,50)'} fill={'black'} stroke={'black'}>
                                                {renderer.render(value, false)}
                                            </g>
                                        </svg>
                                    </td>
                                    <td style={{...style, textAlign: 'justify'}}>{desc[ds][attr].values[value]}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                        {images && images.map(img => {
                            return <>
                                <img src={img.src} style={{maxHeight: 800}}/>
                                <caption style={{width: 450}}>{img.caption}</caption>
                            </>
                        })}
                    </div>
                })}
            </>
        })}
    </div>
}
