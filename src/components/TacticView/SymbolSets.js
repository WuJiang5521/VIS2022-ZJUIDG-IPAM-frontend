const bs = val => 40 * val;

const symbolSets = {
    'Badminton': {
        'Ball Height': {
            glyphs: {
                'Very low': <g></g>,
                'Low': <g></g>,
                'Medium': <g></g>,
                'High': <g></g>,
            }
        },
        'Ball Position': {
            pos: (size, asGlyph) => asGlyph ?
                `` :
                `scale(${size[0] / bs(1)},${size[1] / bs(1)})`,
            params: {
                'Backcourt Left': <g></g>,
                'Backcourt Right': <g></g>,
                'Midfield Left': <g></g>,
                'Midfield Right': <g></g>,
                'Forecourt Left': <g></g>,
                'Forecourt Right': <g></g>,
            },
            template: params => {

            }
        },
        'Hit Technique': {
            pos: (size, asGlyph) => asGlyph ?
                `translate(${-0.05 * size[0]},${0.5 * size[1] - 0.35 * 0.5 * size[1]}) scale(${size[0] / bs(.5)},${size[1] / bs(.5)})` :
                `scale(${size[0] / bs(1)},${size[1] / bs(1)})`,
            params: {
                'Net service': 'NS',
                'Backcourt service': 'BS',
                'Smash': 'Sma.',
                'Drive': 'Dri.',
                'Lift': 'Lift',
                'High clear': 'HClr',
                'Hook': 'Hook',
                'Shot': 'Shot',
                'Net shot': 'NShot',
                'Drop': 'Drop',
                'Push': 'Push',
                'Block': 'Blk',
                'Other': 'Oth.',
                'Score': '+1',
            },
            template: params => {
                return <g>
                    <path d={`M-${bs(0.2)} -${bs(.35)}H${bs(.5)}V-${bs(.15)}A${bs(.5)} ${bs(.5)} 0 0 1 -${bs(.5)} -${bs(.15)}Z`} fillOpacity={0} strokeWidth={1} stroke={'#000'}/>
                    <text x={0} y={-bs(0.1)} textAnchor={'middle'} dominantBaseline={'middle'} fontSize={bs(.3)}>{params}</text>
                </g>
            }
        }
    },
    'Tennis': {
        'Ball Position': {},
        'Hitting Pose': {},
        'Hit Technique': {}
    },
    'Table Tennis': {
        'Hitting Tech': {},
        'Player Pos': {},
        'Ball Pos': {},
        'Spin': {},
    },
}

class Renderer {
    pos = () => '';
    _size = [100, 100];
    template = () => null;
    params = {};
    _color = 'black';

    constructor(glyphConfig) {
        if (!glyphConfig) return;
        this.pos = glyphConfig.pos || this.pos;
        this.template = glyphConfig.template || this.template;
        this.params = glyphConfig.params || this.params;
    }

    size(size) {
        this._size = [size, size];
        return this;
    }

    color(color) {
        this._color = color;
        return this;
    }

    render(value, asGlyph=true) {
        return <g transform={this.pos(this._size, asGlyph)}>
            {this.template(this.params[value]) || null}
        </g>
    }
}

class SymbolSet {
    constructor(ds) {
        this.dsName = ds;
        this.glyphSet = null;
        this.glyphSetName = null;
        for (const glyphSetName of Object.keys(symbolSets))
            if (ds.startsWith(glyphSetName)) {
                this.glyphSetName = glyphSetName;
                this.glyphSet = symbolSets[glyphSetName]
            }
        if (!this.glyphSet)
            console.warn('Unrecognized dataset name: ' + ds);
    }

    attr(attr) {
        if (!this.glyphSet) return new Renderer(null);
        if (this.glyphSet.hasOwnProperty(attr)) return new Renderer(this.glyphSet[attr]);
        console.warn(`Attribute ${attr} is not in the glyph set of ${this.glyphSetName}!`)
    }

    static dataset(ds) {
        return new SymbolSet(ds);
    }
}

export default SymbolSet;
